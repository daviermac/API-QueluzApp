import prisma from "../config/prisma.js";

import parseDateBR from "../helpers/parseDateBR.js";

export async function requestViagem(
  idUsuario,
  first_name,
  surname,
  email,
  cellphone,
  address,
  local,
  local_address,
  comprovante,
  data,
  hora,
  companion_name,
  companion_phone,
  companion_email,
  companion_address
) {
  if (!first_name || !surname || !email || !cellphone || !address || !local || !local_address || !comprovante || !data || !hora) {
    throw new Error("Erro: Todos os dados são obrigatórios!");
  } 

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

  const viagemData = {
    Usuario: {
      connect: { idUsuario }
    },
    StatusSolicitacao: {
      connect: { idStatusViagem: 1 }
    },      
    
    primeiro_nome_paciente: first_name,
    sobrenome_paciente: surname,
    email_paciente: email,
    telefone_paciente: cellphone,
    endereco_paciente: address,
    local_consulta: local,
    endereco_local: local_address,
    comprovante_url: comprovante,
    data_consulta:  parseDateBR(data),
    horario_consulta: hora,
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
