import prisma from "../config/prisma.js";

export async function createCar(modelo, marca, cor, placa, capacidade, tipoCarro) {    
    if (!modelo || !cor || !marca || !placa || !capacidade || !tipoCarro) {
        throw new Error("Todos os dados são obrigatórios!")
    }
    const car = await prisma.carro.create({
        data: {
            modelo,
            marca,
            cor,
            placa,
            capacidade,
            TipoCarro: tipoCarro
        }
    })

    return car
}   

export async function listCars() {
    const cars = await prisma.carro.findMany()

    return cars
}   

export async function deleteCar(idCarro) {
    if (!idCarro) {
        throw new Error("Erro: ID do carro não informado!")
    }

    const carExists = await prisma.carro.findUnique({
        where: {
            idCarro
        }
    })

    if (!carExists) {
        throw new Error("Erro: Carro não encontrado com este ID!")
    }

    const carDeleted = await prisma.carro.delete({
        where: {
            idCarro
        }
    })

    return carDeleted
}   

export async function editCar(idCarro, modelo, marca, cor, placa, capacidade, tipoCarro) {}

export async function changeCarStatus(idCarro, status) {}
