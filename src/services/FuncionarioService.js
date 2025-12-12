import prisma from '../config/prisma.js'

export async function listFunctions() {
    const functionList = await prisma.funcao.findMany()

    return functionList
}

export async function listFuncionarioByCPF(cpf) {
    const funcionario = await prisma.funcionario.findFirst({
        where: {
            Usuario: {
                cpf
            }
        },
        include: {
            Usuario: true,
            FuncionarioFuncao: {
                include: {
                    Funcao: true
                }
            }
        }
    })

    if (!funcionario) {
        throw new Error("Erro: nenhum funcionário encontrado com esse CPF!")
    }

    return funcionario
}

export async function createFuncionario(idUsuario, pis, matricula, idFuncao) {
    if (!idUsuario, !pis, !matricula, !idFuncao) {
        throw new Error("Erro: dados obrigatórios!")
    }

    return await prisma.$transaction(async (tx) => {
        const funcionario = await tx.funcionario.create({
            data: {
                Usuario_idUsuario: idUsuario,
                pis,
                matricula,
            }
        })

        await tx.funcionarioFuncao.create({
            data: {
                Funcionario_idFuncionario: funcionario.idFuncionario,
                Funcao_idFuncao: idFuncao
            }
        })

        return funcionario
    })
}   

export async function createFunction(nome) {
    if (!nome) {
        throw new Error("Erro: nome da função não informado!")
    }

    const funcao = await prisma.funcao.create({
        data: {
            nome
        }
    })

    return funcao
}   
