import express from 'express'
import * as UserService from '../services/UserService.js'

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
        const { primeiroNome, sobrenome, cpf, telefone, email, senha, cep, rua, numero, bairro, cidade } = req.body
        const user = await UserService.createUser(primeiroNome, sobrenome, cpf, telefone, email, senha, cep, rua, numero, bairro, cidade)
        
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

router.get("/getTokens", async (req, res) => {
    const tokens = await UserService.getAllTokens()

    res.json({
        error: false,
        message: "Tokens listados com sucesso!",
        tokens
    })
})

router.put("/update/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params
    try {
        const { primeiroNome, sobrenome, cpf, telefone, email, cep, rua, numero, bairro, cidade} = req.body
        const updatedUser = await UserService.updateUser(idUsuario, primeiroNome, sobrenome, cpf, telefone, email, cep, rua, numero, bairro, cidade)
        
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

router.post("/push-token", async (req, res) => {
    try {
        const { token, plataforma, usuarioId } = req.body;

        const result = await UserService.pushToken(
            token,
            plataforma,
            usuarioId
        );

        return res.status(200).json({
            error: false,
            message: "Token recebido a manipulado com sucesso!",
            result
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
        error: error.message || "Erro ao registrar push token"
    });
}})

export default router
