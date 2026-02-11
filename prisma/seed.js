import prisma from "../src/config/prisma.js";
import bcrypt from 'bcrypt'

async function main() {
    const nomeFuncao = "ADMIN"

    const funcao = await prisma.funcao.findFirst({
        where: {
            nome: nomeFuncao
        }
    })
    
    if (!funcao) {
        await prisma.funcao.create({
            data: {
                nome: "ADMIN"
            }
        })
    }

    const cpf = "17741576755"

    const funcionarioExists = await prisma.funcionario.findUnique({
        where: {
            cpf
        }
    })

    if (!funcionarioExists) {
        const senhaHasheada = await bcrypt.hash(process.env.FIRST_ADMIN_PASS, 10)

        await prisma.funcionario.create({
            data: {
                matricula: 2075,
                primeiroNome: "Fabio",
                senha: senhaHasheada,
                sobrenome: "Santos",
                cpf,
                FuncionarioFuncao: {
                    create: {
                        Funcao_idFuncao: funcao.idFuncao
                    }
                }
            }
        })
        
    }

    
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })