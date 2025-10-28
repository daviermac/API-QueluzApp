import express from 'express'
import * as ViagemService from '../services/ViagemService.js'
import { getSignedUploadUrl } from '../config/S3.js'

const router = express.Router()

router.get("/getAll", async (req, res) => {
    try {
        const requests = await ViagemService.listRequests()

        res.json({ 
            error: false,
            message: "Solicitações listadas com sucesso!", 
            requests, 
        });
    } catch (error) {
        console.error(`Erro ao listar requisições: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar requisições: ${error.message}`
        })
    }
    
})

router.get("/getByUser/:id", async (req, res) => {
    const { id } = req.params

    try {
        const requests = await ViagemService.listRequestsByUser(Number(id))

        res.status(201).json({ 
            error: false,
            message: "Solicitações listadas com sucesso!", 
            requests, 
        });
    } catch (error) {
        console.error(`Erro ao listar requisições: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar requisições: ${error.message}`
        })
    }
}) 

router.post("/generate-url", async (req, res) => {
    const body = req.body

    try {
        const uploadUrl = await getSignedUploadUrl(body.comprovante)
        res.status(201).json({ 
            error: false, 
            uploadUrl, 
            body 
        });
    } catch (error) {
        console.error(`Erro ao gerar url: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao gerar url: ${error.message}`
        })
    }
})

router.post("/request", async (req, res) => {
    const body = req.body

    try {
        const { 
            idUsuario, first_name, surname, email, cellphone, address, local, local_address, 
            comprovante, data, hora, companion_name, companion_phone, companion_email, 
            companion_address 
        } = req.body

        const viagem = await ViagemService.requestViagem(idUsuario, first_name, surname, email, cellphone, address, local, local_address, 
            comprovante, data, hora, companion_name, companion_phone, companion_email, 
            companion_address)

        return res.json({
            error: false,
            message: 'Viagem solicitada com sucesso!',
            viagem
        })
    } catch (error) {
        console.error(`Erro ao receber dados: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao solicitar viagem: ${error.message}`
        })
    }
})

router.post("/create-trip", async (req, res) => {
    const { requestId, carId } = req.body
})

export default router
