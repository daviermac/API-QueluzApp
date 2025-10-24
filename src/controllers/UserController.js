import express from 'express'
import * as UserService from '../services/UserService.js'

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const { primeiroNome, sobrenome, cpf, telefone, email, senha, endereco } = req.body
        const user = await UserService.createUser(primeiroNome, sobrenome, cpf, telefone, email, senha, endereco)
        
        return res.json({
            error: false,
            message: "Usuário criado com sucesso!",
            usuario: user
        })
    } catch (error) {
        console.error("Erro ao cadastrar usuário!", error.message)
        res.status(400).json({
            error: true,
            message: `Erro ao cadastrar usuário!: ${error.message}`
        })
    }
})

export default router
