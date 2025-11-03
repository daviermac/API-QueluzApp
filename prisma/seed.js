import prisma from "../src/config/prisma.js"

async function main() {
  await prisma.tipoSolicitacao.createMany({
    data: [
      { tipoSolicitacao: 'VIAGEM' },
      { tipoSolicitacao: 'OUVIDORIA' },
      { tipoSolicitacao: 'CONSULTA' },
    ],
    skipDuplicates: true,
  })

  await prisma.statusSolicitacao.createMany({
    data: [
      { statusViagem: 'PENDENTE' },
      { statusViagem: 'CONFIRMADA' },
      { statusViagem: 'REALIZADA' },
      { statusViagem: 'CANCELADA' },
    ],
    skipDuplicates: true,
  })

  await prisma.categoriaMensagemOuvidoria.createMany({
    data: [
        { nome_categoria: 'DENUNCIA' },
        { nome_categoria: 'SOLICITACAO' },
        { nome_categoria: 'SUGESTAO' },
        { nome_categoria: 'RECLAMACAO' },
        { nome_categoria: 'ELOGIO' }
    ]
  })
  
await prisma.tipoCarro.createMany({
    data: [
        { nome: 'HATCH' },
        { nome: 'SEDAN' },
        { nome: 'SUV' },
        { nome: 'MINIVAN' },
        { nome: 'VAN' },
    ],
    skipDuplicates: true,
})

  await prisma.statusCarro.createMany({
    data: [
        { statusCarro: 'DISPONIVEL' },
        { statusCarro: 'EM_MANUTENCAO' },
        { statusCarro: 'EM_USO' }
    ]
  })
}

main()
  .then(async () => {
    console.log('✅ Seeds criados com sucesso!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
