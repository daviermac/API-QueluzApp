import prisma from "../config/prisma.js";
import path from 'path'

import parseDateBR from "../helpers/parseDateBR.js";
import parseHoraBR from "../helpers/parseHoraBR.js";

import { getSignedDownloadUrl } from "../config/S3.js";

export async function listViagemRequests() {
  const requests = await prisma.solicitacaoViagem.findMany({
    include: {
      Solicitacao: true,
      StatusSolicitacao: true
    }
  })

  const requestsWithSignedUrls = await Promise.all(
    requests.map(async (req) => {
      if (req.comprovante_url) {
        // remove o domínio e pega só o "key"
        const fileKey = req.comprovante_url.replace(
          /^https:\/\/[^/]+\/(.+)$/,
          "$1"
        );

        const signedUrl = await getSignedDownloadUrl(fileKey, "image/jpeg");
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
      StatusSolicitacao: true
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

        const signedUrl = await getSignedDownloadUrl(fileKey, "image/jpeg");
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
