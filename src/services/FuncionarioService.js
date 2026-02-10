import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function loginFuncionario(matricula, senha) {
    if (!matricula || !senha) {
        throw new Error("Erro: Dados obrigatórios!")
    }   
     
    const funcionario = await prisma.funcionario.findUnique({
        where: {
            matricula,
        }
    })  
     
    if (!funcionario) {
        throw new Error("Erro: nenhum usuário cadastrado com essa matrícula!")
    }   
     
    const correctPassword = await bcrypt.compare(senha, funcionario.senha)
     
    if (!correctPassword) {
        throw new Error("Erro: credenciais incorretas!")
    }

    const functions = await prisma.funcionarioFuncao.findMany({
        where: {
            Funcionario_idFuncionario: funcionario.idFuncionario
        },
        include: {
            Funcao: {
                select: {
                    nome: true
                }
            }
        }
    })

    const funcoes = functions.map(f => f.Funcao.nome)

    const token = jwt.sign(
        {
            id: funcionario.idFuncionario, 
            role: "ADMIN"
        }, 
        process.env.SECRET,
        {
            expiresIn: '1D'
        }
    )

    return { funcionario, funcoes, token }
}

export async function listFunctions() {
    const functionList = await prisma.funcao.findMany()

    return functionList
}

export async function listFuncionarios() {
    const funcionarios = await prisma.funcionario.findMany({
        include: {
            FuncionarioFuncao: {
                select: {
                    Funcao: true,
                }
            }
        }
    })

    return funcionarios
}

export async function listFuncionarioByCPF(cpf) {
    const funcionario = await prisma.funcionario.findFirst({
        where: {
            cpf 
        },
        include: {
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

export async function getMotoristas() {
    const motoristas = await prisma.funcionarioFuncao.findMany({
        where: {
            Funcao: {
                nome: 'MOTORISTA'
            }
        },
        select: {
            Funcionario: {
                select: {
                    idFuncionario: true,
                    matricula: true,
                    primeiroNome: true,
                    sobrenome: true
                }
            },
            Funcao: {
                select: {
                    nome: true
                }
            }
        }
    })

    return motoristas
}

export async function createFuncionario(cpf, primeiroNome, sobrenome, senha, pis, matricula, idFuncao) {
    if (!cpf || !primeiroNome || !sobrenome || !pis || !senha || !matricula || !idFuncao) {
        throw new Error("Erro: dados obrigatórios!")
    }

    const functionExists = await prisma.funcao.findUnique({
        where: {
            idFuncao
        }
    })

    if (!functionExists) {
        throw new Error("Erro: função não encontrada ou não cadastrada!")
    }

    const relationExists = await prisma.funcionarioFuncao.findFirst({
        where: {
            Funcao_idFuncao: idFuncao,
            Funcionario: {
                pis
            }
        }
    })

    if (relationExists) {
        throw new Error("Erro: funcionário já encaixado nessa função!")
    }

    return await prisma.$transaction(async (tx) => {
        const funcionario = await tx.funcionario.create({
            data: {
                cpf,
                primeiroNome,
                sobrenome,
                senha: await bcrypt.hash(senha, 10),
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
    }
)}


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
