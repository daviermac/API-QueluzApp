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
            endereco
        }
    })

    return usuario
}

export async function updateUser(idUsuario, primeiroNome, ultimoNome, cpf, telefone, email, senha, endereco) {
    
}

export async function deleteUser(idUsuario) {
    
}
