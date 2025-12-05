import prisma from "../config/prisma.js";

export async function createCar(modelo, marca, cor, placa, capacidade, tipoCarro) {
    if (!modelo || !cor || !marca || !placa || !capacidade || tipoCarro) {
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

export async function deleteCar(idCarro) {}

export async function editCar(idCarro, modelo, marca, cor, placa, capacidade, tipoCarro) {}

export async function changeCarStatus(idCarro, status) {}
