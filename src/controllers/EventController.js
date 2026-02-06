import express from 'express'
import * as EventServices from '../services/EventService.js'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import upload from '../config/multer.js'

const router = express.Router()

router.get("/get", async (req, res) => {
    try {
        const events = await EventServices.listAllEvents()

        res.json({
            error: false,
            message: "Eventos listados com sucesso!",
            events
        })
    } catch (error) {
        console.error(`Erro ao listar eventos: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar eventos: ${error.message}!`
        })
    }
})

router.get("/getFirstTwo", async (req, res) => {
    try {
        const events = await EventServices.listFirstTwoEvents()

        res.json({
            error: false,
            message: "Eventos listados com sucesso!",
            events
        })
    } catch (error) {
        console.error(`Erro ao listar eventos: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar eventos: ${error.message}!`
        })
    }
})

router.get("/get/:eventId", async (req, res) => {
    const { eventId } = req.params

    try {
        const event = await EventServices.listEventById(eventId)

        res.json({
            error: false,
            message: "Evento listado com sucesso!",
            event
        })
    } catch (error) {
        console.error(`Erro ao listar evento: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar evento: ${error.message}!`
        })
    }
})

router.post("/create", authMiddleware, isAdminMiddleware, upload.fields([{ name: "imagem_chamada", maxCount: 1 }, { name: "imagem_capa", maxCount: 1 }]), async (req, res) => {
    const { titulo, descricao, local_evento, mesInicio, anoInicio, intervaloDatas } = req.body
    
    const capaBuffer = req.files.imagem_capa?.[0].buffer
    const chamadaBuffer = req.files.imagem_chamada?.[0].buffer

    const capaNome = req.files.imagem_capa?.[0].originalname
    const chamadaNome = req.files.imagem_chamada?.[0].originalname

    try {
        const eventCreated = await EventServices.createEvent(titulo, descricao, local_evento, chamadaBuffer, chamadaNome, capaBuffer, capaNome, Number(mesInicio), Number(anoInicio), intervaloDatas)
        
        res.json({
             error: false,
             message: "Curso criado com sucesso!",
             eventCreated
        })
    } catch (error) {
        console.error(`Erro ao criar evento: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao criar evento: ${error.message}!`
        })
    }
})

router.delete("/delete/:eventId", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        
    } catch (error) {
        console.error(`Erro ao excluir evento: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao excluir evento: ${error.message}!`
        })
    }
})

router.put("/inactivate/:eventId", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        
    } catch (error) {
        console.error(`Erro ao desativar evento: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao desativar evento: ${error.message}!`
        })
    }
})

export default router
