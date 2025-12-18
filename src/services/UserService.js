import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt'

export async function createUser(primeiroNome, sobrenome, cpf, telefone, email, senha, endereco) {
    if (!primeiroNome, !sobrenome, !cpf, !telefone, !email, !senha, !endereco) {
        throw new Error("Erro: Todos os campos são obrigatórios!")
    }

    const usuarioJaExiste = await prisma.usuario.findFirst({
        where: {
            OR: [
                { cpf },
                { email }
            ]
        }
    })

    if (usuarioJaExiste) {
        throw new Error("Erro: Usuario já existe!")
    }

    const senhaHasheada = await bcrypt.hash(senha, 10)

    const usuario = await prisma.usuario.create({
        data: {
            primeiroNome,
            sobrenome,
            senha: senhaHasheada,
            cpf,
            telefone,
            email,
            endereco,
            createdAt: new Date()
        }
    })

    return usuario
}

export async function updateUser(idUsuario, primeiroNome, sobrenome, cpf, telefone, email, endereco) {
    if (!idUsuario) {
        throw new Error("Erro: ID de usuário não informado!")
    }
    
    const userExists = await prisma.usuario.findUnique({
        where: {
            idUsuario
        }
    })

    if (!userExists) {
        throw new Error("Erro: Usuario não encontrado!")
    }

    const userUpdated = await prisma.usuario.update({
        data: {
            primeiroNome, sobrenome, cpf, telefone, email, endereco
        },
        where: {
            idUsuario
        }
    })

    return userUpdated
}

export async function deleteUser(idUsuario) {
    if (!idUsuario) {
        throw new Error("Erro: ID de usuário não informado!")
    }
    
    const user = await prisma.usuario.findUnique({
        where: {
            idUsuario
        }
    })

    if (!user) {
        throw new Error("Erro: Usuário inexistente!")
    }

    const userDeleted = await prisma.usuario.delete({
        where: {
            idUsuario
        }
    })

    return userDeleted
}
