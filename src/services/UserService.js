import prisma from '../config/prisma'
import bcrypt from 'bcrypt'

export async function createUser(primeiroNome, ultimoNome, cpf, telefone, email, senha, endereco) {
    if (!primeiroNome, !ultimoNome, !cpf, !telefone, !email, !senha, !endereco) {
        throw new Error("Erro: Todos os campos são obrigatórios!")
    }

    const userByCpf = await prisma.usuario.findUnique({
        where: { cpf }
    })

    const userByEmail = await prisma.usuario.findUnique({
        where: { email }
    })

    if (userByCpf || userByEmail) {
        throw new Error("Erro: CPF ou email já cadastrado!")
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    const user = await prisma.usuario.create({
        data: {
            primeiroNome, 
            ultimoNome, 
            cpf, 
            telefone, 
            email, 
            senha: hashedPassword, 
            endereco
        }
    })

    return user
}

export async function updateUser(idUsuario, primeiroNome, ultimoNome, cpf, telefone, email, senha, endereco) {

}

export async function deleteUser(idUsuario) {
    
}
