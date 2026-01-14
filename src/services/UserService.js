import prisma from '../config/prisma.js'
import bcrypt from 'bcrypt'
 
export async function getUserById() {}

export async function getUserByEmail(email) {
    if (!email) {
        throw new Error("Erro: E-mail não informado!")
    }

    
}

export async function createUser(primeiroNome, sobrenome, cpf, telefone, email, senha, cep, rua, numero, bairro, cidade) {
    if (!primeiroNome, !sobrenome, !cpf, !telefone, !email, !senha, !cep, !rua, !numero, !bairro, !cidade) {
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
            cep,
            rua,
            numero,
            bairro,
            cidade,
            createdAt: new Date()
        }
    })

    return usuario
}

export async function updateUser(idUsuario, primeiroNome, sobrenome, cpf, telefone, email, cep, rua, numero, bairro, cidade) {
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
            primeiroNome, sobrenome, cpf, telefone, email, cep, rua, numero, bairro, cidade
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

export async function pushToken(token, plataforma, usuarioId) {
    const tokenJaExiste = await prisma.pushToken.findUnique({
        where: { token }
    })

    if (tokenJaExiste) {
        if (tokenJaExiste.usuarioId === usuarioId) {
            // Já está tudo certo
            return tokenJaExiste
        }

        // Token era de outro usuário → atualiza
        return await prisma.pushToken.update({
            where: { token },
            data: { usuarioId }
        })
    }

    return await prisma.pushToken.create({
        data: {
            token,
            usuarioId,
            plataforma
        }
    })
}
