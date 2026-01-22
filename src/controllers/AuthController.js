import express from 'express'
import * as AuthService from '../services/AuthService.js'
import getDirname from '../helpers/getDirName.js'
import path from 'path'
import { passwordResetMiddleware } from '../middlewares/passwordResetMiddleware.js'

const router = express.Router()
const __dirname = getDirname(import.meta.url)

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

// Rota que enviar o email de recuperação
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body

        const link = await AuthService.forgottenPassword(email)

        res.json({
            error: false,
            message: "Link de recuperação enviado com sucesso!",
            link
        })
    } catch (error) {
        console.error("Erro ao atualizar a senha", error)
        res.status(500).json({
            error: true,
            message: `Erro ao enviar link de recuperação: #${error.message}`
        })
    }
})

// Rota que vai renderizar a tela 
router.get("/reset-password/:token", passwordResetMiddleware, async (req, res) => {    
    res.sendFile(path.join(__dirname, "../pages/recuperar_senha.html"))
})

router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body

    try {
        const userUpdated = await AuthService.resetPassword(token, newPassword) 

        res.json({
            error: false,
            message: "Senha atualizada com sucesso"
        })
    } catch (error) {
        console.error("Erro ao atualizar a senha", error)
        res.status(500).json({
            error: true,
            message: "Erro ao atualizar a senha"
        })
    }
})

export default router
