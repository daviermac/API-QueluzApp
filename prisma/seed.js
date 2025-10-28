import prisma from '../src/config/prisma.js'

async function main() {
  await prisma.statusCarro.createMany({
    data: [
      { statusCarro: "DISPONÍVEL" },
      { statusCarro: "EM USO" },
      { statusCarro: "DEFEITUOSO" }
    ],
    skipDuplicates: true
  }
)

  await prisma.tipoCarro.createMany({
    data: [
        { nome: "SUV" },
        { nome: "MINIVAN" },
        { nome: "HATCH" },
        { nome: "SEDAN" },
        { nome: "PICKUP" },
        { nome: "MINIVAN" },

    ],
    skipDuplicates: true
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(err => {
    console.error(err)
    prisma.$disconnect()
    process.exit(1)
})
