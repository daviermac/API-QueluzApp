import prisma from "../config/prisma.js";

export async function createCar(modelo, marca, cor, placa, capacidade, idTipoCarro) {
    if (!modelo || !cor || !marca || !placa || !capacidade || !idTipoCarro) {
        throw new Error("Todos os dados são obrigatórios!")
    }

    const status = await prisma.statusCarro.findFirst({
        where: {
            statusCarro: 'DISPONIVEL'
        }
    })

    const car = await prisma.carro.create({
        data: {
            StatusCarro_idStatusCarro: status.idStatusCarro,
            TipoCarro_idTipoCarro: idTipoCarro,
            modelo,
            marca,
            cor,
            placa,
            capacidade
        }
    })

    return car
}

export async function listCars() {
    const cars = await prisma.carro.findMany({
        include: {
            TipoCarro: true,
            StatusCarro: true
        }
    })

    return cars
}
