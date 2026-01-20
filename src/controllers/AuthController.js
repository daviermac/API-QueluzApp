import express from 'express'
import * as AuthService from '../services/AuthService.js'

const router = express.Router()

router.post("/login", async (req, res) => {
    const { cpf, senha } = req.body

    try {
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

router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body

        console.log(email)
        const link = await AuthService.forgottenPassword(email)

        res.json({
            error: false,
            message: "Link de recuperação enviado com sucesso!",
            link
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Erro ao enviar link de recuperação: #${error.message}`
        })
    }
})

export default router
