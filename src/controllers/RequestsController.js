import express from 'express'
import * as RequestsService from '../services/RequestsService.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/get/:idUsuario", authMiddleware, async (req, res) => {
    const { idUsuario } = req.params

    try {
        const requests = await RequestsService.listRequestsByUser(idUsuario)

        res.json({
            error: false,
            message: "Solicitações listadas com sucesso!",
            requests
        })
    } catch (error) {
        console.error(`Erro ao listar requisições: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar requisições: ${error.message}`
        })
    }
})

router.put("/cancel/:requestId", authMiddleware, async (req, res) => {
    const { requestId } = req.params
    const { motive } = req.body

    try {
        const requestUpdated = await RequestsService.cancelRequest(requestId, motive)

        res.json({
            error: false,
            message: "Solicitação cancelada com sucesso!",
            requestUpdated
        })
    } catch (error) {
        console.error(`Erro ao cancelar requisição: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao cancelar requisição: ${error.message}`
        })
    }
})

export default router
