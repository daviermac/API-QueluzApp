import express from 'express'
import * as ViagemService from '../services/ViagemService.js'
import { getSignedUploadUrl } from '../config/S3.js'

const router = express.Router()

router.get("/companion/:idAcompanhante", async (req, res) => {
    const { idAcompanhante } = req.params

    try {
        const companion = await ViagemService.getCompanionById(Number(idAcompanhante))
        res.json({ 
            error: false,
            message: "Acompanhante encontrado com sucesso!", 
            companion, 
        });
    } catch (error) {
        console.error(`Erro ao buscar acompanhante: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao buscar acompanhante: ${error.message}`
        })
    }
})

router.get("/getRequests", async (req, res) => {
    try {
        const requests = await ViagemService.listViagemRequests()

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

router.get("/getRequests/:idUsuario", async (req, res) => {
    const { idUsuario } = req.params

    try {
        const requestsWithSignedUrls = await ViagemService.listViagemRequestsByUser(Number(idUsuario))

        res.status(200).json({ 
            error: false,
            message: "Solicitações listadas com sucesso!", 
            requestsWithSignedUrls, 
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
    const { fileType, idUsuario } = req.body

    try {
        const fileName = `${Date.now()}-${idUsuario}.jpg`
        const fileKey = `comprovantes/${idUsuario}/${fileName}`

        const uploadUrl = await getSignedUploadUrl(fileKey, fileType)
                
        res.status(201).json({ 
            error: false, 
            uploadUrl, 
            fileKey 
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
    try {
        const { 
            idUsuario, first_name, surname, email, cellphone, address, local, local_city, 
            comprovante, data, hora, companion_name, companion_phone, companion_email, 
            companion_address 
        } = req.body

        const viagem = await ViagemService.requestViagem(idUsuario, first_name, surname, email, cellphone, address, local, local_city, 
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

router.post("/create", async (req, res) => {
    const { idCarro, idFuncionario, idsSolicitacoes, dataPartida, enderecoLocalPartida } = req.body

    try {
        
    } catch (error) {
        
    }
})

export default router
