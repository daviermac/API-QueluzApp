import prisma from "../config/prisma.js";

import parseDateBR from "../helpers/parseDateBR.js";
import parseHoraBR from "../helpers/parseHoraBR.js";

export async function listRequests() {
  
}

export async function listRequestsByUser(userId) {
  
}

export async function requestViagem( idUsuario, first_name, surname, email, cellphone, address, local, local_address, comprovante, data, hora, companion_name, companion_phone, companion_email, companion_address ) {
  if (!first_name || !surname || !email || !cellphone || !address || !local || !local_address || !comprovante || !data || !hora) {
    throw new Error("Erro: Todos os dados são obrigatórios!");
  } 

  // Criação do acompanhante
  let acompanhante
  if (companion_name) {
    acompanhante = await prisma.acompanhante.create({
      data: {
        nomeCompleto: companion_name,
        telefone: companion_phone.replace(/\D/g, ''),
        email: companion_email,
        endereco: companion_address
      }
    })
  }

  // Criação de uma solicitação
  const tipoSolicitacaoViagem = await prisma.tipoSolicitacao.findFirst({
    where: {
      tipoSolicitacao: 'VIAGEM'
    }
  })

  let soliticacao = await prisma.solicitacao.create({
    data: {
      Usuario: {
        connect: { idUsuario }
      },
      TipoSolicitacao: {
        connect: { idTipoSolicitacao: tipoSolicitacaoViagem.idTipoSolicitacao }
      },
      primeiro_nome_solicitante: first_name,
      sobrenome_solicitante: surname,
      email_solicitante: email,
      telefone_solicitante: cellphone,
    }
  })

  // Criação da solicitação da viagem
  const statusPendente = await prisma.statusSolicitacaoViagem.findFirst({ where: { statusViagem: 'PENDENTE' }})

  const viagemData = {
    StatusSolicitacao: {
      connect: { idStatusViagem: statusPendente.idStatusViagem}
    },
    Solicitacao: {
      connect: { idSolicitacao: soliticacao.idSolicitacao }
    },
    endereco_paciente: address,
    local_consulta: local,
    endereco_local: local_address,
    comprovante_url: comprovante,
    data_consulta:  parseDateBR(data),
    horario_consulta: parseHoraBR(hora),
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

export async function createViagem() {
    
}
