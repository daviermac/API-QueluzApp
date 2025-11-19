import express from 'express'
import * as FuncionarioServices from '../services/FuncionarioService.js'

const router = express.Router()

router.get("/getFuncionarioByCpf/:cpf", async (req, res) => {
    const { cpf } = req.params

    try {
        const funcionario = await FuncionarioServices.listFuncionarioByCPF(cpf)
        
        res.json(funcionario)
    } catch (error) {
        console.error(`Erro ao listar funcionário por CPF: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar funcionário por CPF: ${error.message}`
        })
    }
})

router.get("/listFunctions", async (req, res) => {
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

router.post("/register", async (req, res) => {
    const { idUsuario, idFuncao, pis, matricula } = req.body

    try {
        const funcionario = await FuncionarioServices.createFuncionario(Number(idUsuario), pis, matricula, Number(idFuncao))

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

router.post("/createFunction", async (req, res) => {
    const { nome } = req.body

    try {
        const functionCreated = await FuncionarioServices.createFunction(nome) 

        return res.json({
            error: false,
            message: "Funções listadas com sucesso!",
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
