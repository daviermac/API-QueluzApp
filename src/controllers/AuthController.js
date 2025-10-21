import express from 'express'
import prisma from '../config/prisma'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import * as AuthService from '../services/AuthService'

const router = express.Router()

router.post("/login", async (req, res) => {
    try {
        const { cpf, senha } = req.body
        const { user, token } = await AuthService.login(cpf, senha)

        return res.json({
            error: false,
            message: "Login realizado com sucesso!",
            user,
            token
        })
    } catch (error) {
        console.error("Erro ao realizar autenticação", error.message)
        res.status(401).json({
            error: true,
            message: `Erro ao realizar autenticação: ${error.message}`
        })
    }
})

export default router
