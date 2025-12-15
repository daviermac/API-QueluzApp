import express from 'express'
import * as RequestsService from '../services/RequestsService.js'

const router = express.Router()

router.get("/get/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params

    try {
        const requestsWithSignedUrls = await RequestsService.listRequestsByUser(idUsuario)

        res.json({
            error: false,
            message: "Solicitações listadas com sucesso!",
            requestsWithSignedUrls
        })
    } catch (error) {
        console.error(`Erro ao listar requisições: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar requisições: ${error.message}`
        })
    }
})

export default router
