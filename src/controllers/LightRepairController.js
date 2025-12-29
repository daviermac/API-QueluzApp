import * as LightRepairService from '../services/LightRepairService.js'
import { getSignedUploadUrl } from '../config/S3.js'
import express from 'express'
const router = express.Router()

router.post("/generate-url", async (req, res) => {
    const { fileType, idUsuario } = req.body

    try {
        const fileName = `${Date.now()}-${idUsuario}.jpg`
        const fileKey = `imagem-poste/${idUsuario}/${fileName}`

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
    const { idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem } = req.body

    try {
        const request = await LightRepairService.requestLightRepair(idUsuario, tipoProblema, descricao, enderecoTexto, referencia, latitude, longitude, imagem)   
        
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

router.get("/getAllRequests", async (req, res) => {

})

router.put("/closeRequest", async (req, res) => {

})

export default router
