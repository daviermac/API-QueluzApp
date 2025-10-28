import express from 'express'
import * as CarService from '../services/CarService.js'

const router = express.Router()

router.get("/get", async (req, res) => {
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

router.post("/create", async (req, res) => {
    const { modelo, marca, cor, placa, capacidade, idTipoCarro } = req.body
    
    try {
        const car = await CarService.createCar( modelo, marca, cor, placa, capacidade, idTipoCarro )

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
