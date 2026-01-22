import prisma from "../config/prisma.js";
import parseDateBR from "../helpers/parseDateBR.js";
import parseHoraBR from "../helpers/parseHoraBR.js";
import { getSignedDownloadUrl } from "../config/S3.js";
import { sendPushNotification } from "./NotificationService.js";

const bucket_privado = process.env.AWS_PRIVATE_BUCKET

export async function getCompanionData(userId, companionId) {
  const companionUserRelation = await prisma.acompanhantePaciente.findFirst({
    where: {
      Usuario_idUsuario: userId,
      Acompanhante_idAcompanhante: companionId
    }
  });

  if (!companionUserRelation) {
    throw new Error("Erro: Acompanhante não cadastrado, ou sem relação com este usuário!")
  }
}

export async function listViagemRequests() {
  const requests = await prisma.solicitacaoViagem.findMany({
    include: {
      Solicitacao: true,
      Acompanhante: true,
      Viagem: true
    }
  })

  const requestsWithSignedUrls = await Promise.all(
    requests.map(async (req) => {
      if (req.comprovante_url) {
        const signedUrl = await getSignedDownloadUrl(bucket_privado, req.comprovante_url);
        return {
          ...req,
          link_comprovante_acessivel: signedUrl
        };
      }
      return req;
    })
  );

  return requestsWithSignedUrls;
}

export async function listViagemRequestsByUser(userId) {
  const requests = await prisma.solicitacaoViagem.findMany({
    include: {
      Solicitacao: true,
      Acompanhante: true,
      Viagem: true
    },
    where: {
      Solicitacao: {
        Usuario_idUsuario: userId
      }
    }
  })

  // Aguarda gerar todas as URLs pré-assinadas
  const requestsWithSignedUrls = await Promise.all(
    requests.map(async (req) => {
      if (req.comprovante_url) {
        // remove o domínio e pega só o "key"
        const fileKey = req.comprovante_url.replace(
          /^https:\/\/[^/]+\/(.+)$/,
          "$1"
        );

        const signedUrl = await getSignedDownloadUrl(bucket_privado, fileKey, "image/jpeg");
        return {
          ...req,
          link_comprovante_acessivel: signedUrl
        };
      }
      return req;
    })
  );

  return requestsWithSignedUrls;
}

export async function requestViagem( idUsuario, first_name, surname, email, cellphone, address, local, local_city, comprovante, data, hora, companion_cpf, companion_name, companion_phone, companion_email, companion_address ) {
  if (!first_name || !surname || !email || !cellphone || !address || !local || !local_city || !comprovante || !data || !hora) {
    throw new Error("Erro: Todos os dados são obrigatórios!");
  } 

  // Criação do acompanhante
  let acompanhante;

  if (companion_cpf) {
    acompanhante = await prisma.acompanhante.create({
      data: {
        nomeCompleto: companion_name,
        endereco: companion_address,
        telefone: companion_phone.replace(/\D/g, ''),
        email: companion_email,
        cpf: companion_cpf
      }
    })    
  }
  
  // Criação de uma solicitação
  let soliticacao = await prisma.solicitacao.create({
    data: {
      Usuario: {
        connect: { idUsuario }
      },
      TipoSolicitacao: "VIAGEM",
      primeiro_nome_solicitante: first_name,
      sobrenome_solicitante: surname,
      email_solicitante: email,
      telefone_solicitante: cellphone,
      criadaEm: new Date()
    }
  })

  // Criação da solicitação da viagem
  const viagemData = {
    Solicitacao: {
      connect: { idSolicitacao: soliticacao.idSolicitacao }
    },
    
    endereco_paciente: address,
    local_consulta: local,
    cidade_consulta: local_city,
    comprovante_url: comprovante,
    data_consulta:  parseDateBR(data),
    horario_consulta: parseHoraBR(hora),
    statusSolicitacao: 'PENDENTE',
  };

  if (acompanhante) {
    viagemData.Acompanhante = {
      connect: { idAcompanhante: acompanhante.idAcompanhante }
    }
  }

  const viagem = await prisma.solicitacaoViagem.create({
    data: viagemData
  });

  return viagem;
}

export async function createViagem(idCarro, idFuncionario, solicitacoes, paradas, dataPartida, horaPartida, localPartida, enderecoLocalPartida) {
  // Validações
  if (!idCarro || !idFuncionario || !dataPartida || !enderecoLocalPartida) {
    throw new Error("Erro: Todos os dados são obrigatórios!");
  }
           
  if (!Array.isArray(solicitacoes) || solicitacoes.length === 0) {
    throw new Error("Erro: É necessário informar ao menos uma solicitação!");
  }

  if (!Array.isArray(paradas) || paradas.length === 0) {
    throw new Error("Erro: É necessário informar ao menos uma parada!");
  }

  return await prisma.$transaction(async (tx) => {
    // Verifica carro
    const car = await tx.carro.findUnique({
      where: { idCarro }
    });

    if (!car) {
      throw new Error("Erro: Carro não cadastrado ou indisponível!");
    }

    // Cria viagem
    const viagem = await tx.viagem.create({
      data: {
        Funcionario_idFuncionario: idFuncionario,
        Carro_idCarro: idCarro,
        dataPartida: parseDateBR(dataPartida),
        localPartida,
        horaPartida: new Date(`1970-01-01T${horaPartida}`),
        enderecoLocalPartida
      }
    });

    let tokens = [];

    for (const solicitacao of solicitacoes) {
      const solicitacaoAtualizada = await tx.solicitacaoViagem.update({
        where: { idSolicitacaoViagem: solicitacao.idSolicitacaoViagem },
        data: {
          Viagem_idViagem: viagem.idViagem,
          statusSolicitacao: 'CONFIRMADA',
          buscado_em_casa: solicitacao.buscado_em_casa ? true : false
        },
        include: {
          Solicitacao: {
            include: {
              Usuario: {
                include: {
                  PushToken: true
                }
              }
            }
          }
        }
      });

      tokens.push(...solicitacaoAtualizada.Solicitacao.Usuario.PushToken);
    }

    console.log(tokens);

    for (const push of tokens) {
      try {
        await sendPushNotification({
          token: push.token,
          title: "Viagem confirmada 🚗",
          body: "Sua solicitação foi confirmada com sucesso.",
          data: {
            viagemId: String(viagem.idViagem),
            status: "CONFIRMADA"
          }
        });
      } catch (err) {
        console.error("Erro ao enviar push:", err);
      }
    }

    // Atribui as paradas as viagens
    for (const parada of paradas) {
      await tx.parada.create({
        data: {
          local: parada.local,
          endereco: parada.endereco,
          horario: new Date(`1970-01-01T${parada.horario}`),
          Viagem_idViagem: viagem.idViagem,
        }
      })
    }

    return viagem;
  });
}

export async function cancelRequest(idRequest, motivo) {
  if (!idRequest || !motivo) {
    throw new Error("Erro: Dados não informados!")
  } 

  const requestExists = await prisma.solicitacaoViagem.findUnique({
    where: {
      idSolicitacaoViagem: idRequest
    }
  })

  if (!requestExists) {
    throw new Error("Erro: Nenhuma solicitação encontrada com este ID!")
  }

  if (requestExists && !motivo) {
    throw new Error("Erro: O motivo do cancelamento é obrigatório!")
  }

  const requestUpdated = await prisma.solicitacaoViagem.update({
    where: {
      idSolicitacaoViagem: idRequest
    },
    data: {
      StatusSolicitacao: 'CANCELADA',
      motivo_cancelamento: motivo
    }
  })

  return requestUpdated
}
