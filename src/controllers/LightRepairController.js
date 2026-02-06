import * as LightRepairService from '../services/LightRepairService.js'
import { getSignedUploadUrl } from '../config/S3.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import express from 'express'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'
const router = express.Router()

const bucket_publico = process.env.AWS_PUBLIC_BUCKET

router.post("/generate-url", authMiddleware, async (req, res) => {
    const { fileType, idUsuario } = req.body

    try {
        const fileName = `${Date.now()}-${idUsuario}.jpg`
        const fileKey = `imagem-poste/${idUsuario}/${fileName}`

        const uploadUrl = await getSignedUploadUrl(bucket_publico, fileKey)
                
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
    const { idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem, primeiroNome, sobrenome, email, telefone } = req.body

    try {
        const request = await LightRepairService.requestLightRepair(idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem, primeiroNome, sobrenome, email, telefone)   
        
        return res.json({
            error: false,
            message: 'Requisição enviada com sucesso!',
            request
        })
    } catch (error) {
        console.error(`Erro ao receber dados: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao enviar solicitação: ${error.message}`
        })
    }
})

router.get("/getAllRequests", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const requests = await LightRepairService.getAllRequests()
        
        return res.json({
            error: false,
            message: 'Requisições listadas com sucesso!',
            requests
        })
    } catch (error) {
        console.error(`Erro ao receber dados: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao enviar solicitação: ${error.message}`
        })
    }
})

router.get("/get/:requestId", authMiddleware, async (req, res) => {
    const { requestId } = req.params

    try {
        const request = await LightRepairService.getRequestById(requestId)

        return res.json({
            error: false,
            message: 'Requisição listada com sucesso!',
            request
        })
    } catch (error) {
        console.error(`Erro ao receber solicitação: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao receber solicitação: ${error.message}`
        })
    }
})

router.get("/getByUser/:idUsuario", authMiddleware, async (req, res) => {
    const { idUsuario } = req.params

    try {
        const requests = await LightRepairService.getRequestsByUser(idUsuario)

        return res.json({
            error: false,
            message: 'Requisições listada com sucesso!',
            requests
        })
    } catch (error) {
        console.error(`Erro ao receber solicitação: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao receber solicitação: ${error.message}`
        })
    }
})

router.put("/closeRequest", async (req, res) => {

})

export default router
