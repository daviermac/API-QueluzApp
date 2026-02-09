import express from 'express'
import * as ViagemService from '../services/ViagemService.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getSignedUploadUrl } from '../config/S3.js'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'

const bucket_privado = process.env.AWS_PRIVATE_BUCKET

const router = express.Router()

router.get("/getRequests", authMiddleware, isAdminMiddleware, async (req, res) => {
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

router.get("/getRequests/:idUsuario", authMiddleware, async (req, res) => {
    const { idUsuario } = req.params

    try {
        const requestsWithSignedUrls = await ViagemService.listViagemRequestsByUser(idUsuario)

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

router.get("/getRequestById/:idRequisicao", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { idRequisicao } = req.params

    try {
        const request = await ViagemService.getRequestById(idRequisicao)

        res.json({
            error: false,
            message: "Solicitação listada com sucesso!",
            request
        })
    } catch (error) {
        console.error(`Erro ao listar solicitação: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar solicitação: ${error.message}`
        })
    }
})

router.get("/getTripPlans", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const tripPlans = await ViagemService.getAllTripPlans()

        res.json({
            error: false,
            message: "Planos de viagem listados com sucesso!",
            tripPlans
        })
    } catch (error) {
        console.error(`Erro ao listar planos de viagem: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao listar planos de viagem: ${error.message}`
        })
    }
})

router.post("/generate-url", authMiddleware, async (req, res) => {
    const { fileType, idUsuario } = req.body

    try {
        const fileName = `${Date.now()}-${idUsuario}.jpg`
        const fileKey = `comprovantes/${idUsuario}/${fileName}`

        const uploadUrl = await getSignedUploadUrl(bucket_privado, fileKey)
                
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

router.post("/request", authMiddleware, async (req, res) => {
    try {   
        const { 
            idUsuario, first_name, surname, email, cellphone, address, local, local_city, 
            comprovante, data, hora, companion_name, companion_phone, companion_email, companion_cpf,
            companion_address 
        } = req.body
            
        const viagem = await ViagemService.requestViagem(
            idUsuario, 
            first_name, 
            surname, 
            email, 
            cellphone, 
            address, 
            local, 
            local_city, 
            comprovante, 
            data, 
            hora, 
            companion_cpf,        
            companion_name,
            companion_phone,
            companion_email,
            companion_address
        )   
            
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

router.post("/create", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { idCarro, idFuncionario, solicitacoes, paradas, dataPartida, horaPartida, localPartida, enderecoLocalPartida } = req.body

    try {
        const viagem = await ViagemService.createViagem(idCarro, idFuncionario, solicitacoes, paradas, dataPartida, horaPartida, localPartida, enderecoLocalPartida)

        return res.json({
            error: false,
            message: 'Viagem criada com sucesso!',
            viagem
        })   
    } catch (error) {
        console.error(`Erro ao cadastrar viagem: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao cadastrar viagem: ${error.message}`
        })
    }
})

router.put("/cancel/:idSolicitacao", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { idSolicitacao } = req.params
    const { motivo } = req.body
    
    try {
        const requestUpdated = await ViagemService.cancelRequest(idSolicitacao, motivo)

        return res.json({
            error: false,
            message: 'Solicitação cancelada com sucesso!',
            requestUpdated
        })
    } catch (error) {
        console.error(`Erro ao cancelar viagem: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao cancelar viagem: ${error.message}`
        })
    }
})

export default router
