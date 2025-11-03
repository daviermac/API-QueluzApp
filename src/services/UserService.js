import bcrypt from 'bcrypt'

export async function createUser(primeiroNome, sobrenome, cpf, telefone, email, senha, endereco) {
    if (!primeiroNome, !sobrenome, !cpf, !telefone, !email, !senha, !endereco) {
        throw new Error("Erro: Todos os campos são obrigatórios!")
    }

    
    
}

export async function updateUser(idUsuario, primeiroNome, ultimoNome, cpf, telefone, email, senha, endereco) {
    
}

export async function deleteUser(idUsuario) {
    
}
