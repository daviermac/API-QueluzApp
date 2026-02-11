import express from 'express'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'
import * as FuncionarioServices from '../services/FuncionarioService.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/login", async (req, res) => {
    const { matricula, senha } = req.body

    try {
        const { funcionario, token, funcoes } = await FuncionarioServices.loginFuncionario(matricula, senha)
        
        return res.json({
            error: false,
            message: "Login realizado com sucesso!",
            funcionario,
            funcoes,
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

router.get("/getFuncionarios", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const funcionarios = await FuncionarioServices.listFuncionarios()

        return res.json({
            error: false,
            message: "Funcionários listados com sucesso!",
            funcionarios
        })
    } catch (error) {
        console.error(`Erro ao listar funcionários: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar funcionários: ${error.message}`
        })
    }
})

router.get("/getFuncionarioByCpf/:cpf", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { cpf } = req.params

    try {
        const funcionario = await FuncionarioServices.listFuncionarioByCPF(cpf)
        
        return res.json({
            error: false,
            message: "Funcionario listado com sucesso!",
            funcionario,
        })
    } catch (error) {
        console.error(`Erro ao listar funcionário por CPF: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar funcionário por CPF: ${error.message}`
        })
    }
})

router.get("/getMotoristas", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const motoristas = await FuncionarioServices.getMotoristas()

        return res.json({
            error: false,
            message: "Motoristas listados com sucesso!",
            motoristas
        })
    } catch (error) {
        console.error(`Erro ao listar motoristas: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar motoristas: ${error.message}`
        })
    }
})

router.get("/listFunctions", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const functions = await FuncionarioServices.listFunctions()

        return res.json({
            error: false,
            message: "Funções listadas com sucesso!",
            functions
        })
    } catch (error) {
        console.error(`Erro ao listar funções: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar funções: ${error.message}`
        })
    }
})

router.post("/register", /*authMiddleware, isAdminMiddleware, */async (req, res) => {
    const { cpf, primeiroNome, sobrenome, senha, matricula, idFuncao } = req.body

        
    try {
        const funcionario = await FuncionarioServices.createFuncionario(
                cpf,
                primeiroNome,
                sobrenome,
                senha,
                matricula,
                idFuncao
            )

        return res.json({
            error: false,
            message: "Funcionário registrado com sucesso!",
            funcionario
        })
    } catch (error) {
        console.error(`Erro ao registrar funcionário: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao registrar funcionário: ${error.message}`
        })
    }
})

router.post("/createFunction", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { nome } = req.body

    try {
        const functionCreated = await FuncionarioServices.createFunction(nome) 

        return res.json({
            error: false,
            message: "Função criada com sucesso!",
            function: functionCreated
        })
    } catch (error) {
        console.error(`Erro ao criar função: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar função: ${error.message}`
        })
    }
})

export default router
