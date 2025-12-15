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

router.put("/update/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params
    try {
        const { primeiroNome, sobrenome, cpf, telefone, email, endereco } = req.body
        const updatedUser = await UserService.updateUser(idUsuario, primeiroNome, sobrenome, cpf, telefone, email, endereco)
        
        return res.json({
            error: false,
            message: "Usuário atualizado com sucesso!",
            usuario: updatedUser
        })
    } catch (error) {
        console.error("Erro ao atualizar usuário!", error.message)
        res.status(400).json({
            error: true,
            message: `Erro ao atualizar usuário!: ${error.message}`
        })
    }
})

router.delete("/delete/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params

    try {
        const userDeleted = await UserService.deleteUser(idUsuario)

        return res.json({
            error: false,
            message: "Usuário deletado com sucesso!",
            usuario: userDeleted
        })
    } catch (error) {
        console.error("Erro ao deletar usuário!", error.message)
        res.status(400).json({
            error: true,
            message: `Erro ao deletar usuário!: ${error.message}`
        })
    }
})

export default router
