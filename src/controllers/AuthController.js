import express from 'express'
import * as AuthService from '../services/AuthService.js'

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { cpf, senha } = req.body
        const { user, token } = await AuthService.login(cpf, senha)

        return res.json({
            error: false,
            message: "Login realizado com sucesso!",
            usuario: user,
            token
        })
    } catch (error) {
        console.error("Erro ao realizar autenticação", error.message)
        res.status(401).json({
            error: true,
            message: error.message
        })
    }
})

export default router
