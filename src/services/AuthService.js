import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export async function login(cpf, senha) {
    if (!cpf || !senha) {
        throw new Error("Erro: Dados Obrigatórios!")
    }

    const user = await prisma.usuario.findUnique({
        where: {
            cpf
        }
    })

    if (!user) {
        throw new Error("Erro: Usuário não encontrado!")
    }

    const correctPassword = await bcrypt.compare(senha, user.senha)

    if (!correctPassword) {
        throw new Error("Erro: Credenciais incorretas!")
    }   

    const SECRET = process.env.SECRET

    const token = jwt.sign({
        user: user,
    }, SECRET)

    return { user, token }
}       
