import express from 'express'
import * as CarService from '../services/CarService.js'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/get", authMiddleware, isAdminMiddleware, async (req, res) => {
    try {
        const carsList = await CarService.listCars()

        res.json({
            error: false,
            message: "Sucesso ao listar os carros!",
            carsList
        })
    } catch (error) {
        console.error(`Erro: Carro não criado: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao cadastrar carro!: ${error.message}`
        })    
    }
})

router.post("/create", authMiddleware, isAdminMiddleware, async (req, res) => {
    const { modelo, marca, cor, placa, capacidade, tipoCarro } = req.body
    
    try {
        const car = await CarService.createCar( modelo, marca, cor, placa, Number(capacidade), tipoCarro )

        return res.status(201).json({
            error: false,
            message: "Carro criado com sucesso!",
            car
        })
    } catch (error) {
        console.error(`Erro: Carro não criado: ${error.message}`)
        res.status(400).json({
            error: true,
            message: `Erro ao cadastrar carro!: ${error.message}`
        })    
    }
})

export default router
