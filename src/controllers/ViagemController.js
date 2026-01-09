import express from 'express'
import * as ViagemService from '../services/ViagemService.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { getSignedUploadUrl } from '../config/S3.js'

const bucket_privado = process.env.AWS_PRIVATE_BUCKET

const router = express.Router()

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

router.post("/generate-url", async (req, res) => {
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

router.post("/request", async (req, res) => {
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

router.post("/create", async (req, res) => {
    const { idCarro, idFuncionario, idsSolicitacoes, paradas, dataPartida, enderecoLocalPartida } = req.body

    try {
        const viagem = await ViagemService.createViagem(idCarro, idFuncionario, idsSolicitacoes, paradas, dataPartida, enderecoLocalPartida)

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

router.put("/cancel/:idSolicitacao", async (req, res) => {
    const { idSolicitacao } = req.params
    const { motivo } = req.body

    console.log(motivo)

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
