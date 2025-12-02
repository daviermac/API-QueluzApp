import { PrismaClient } from "../../prisma/generated/prisma/client.js"

const prisma = new PrismaClient()

prisma.$connect()
    .then(res => console.log(res))
    .catch(err => console.error(err))

export default prisma
