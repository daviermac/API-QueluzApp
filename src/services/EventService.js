import prisma from '../config/prisma.js'
import { uploadPhotoToS3 } from '../config/S3.js'

export async function listAllEvents() {
    const events = await prisma.evento.findMany()

    return events
}

export async function listEventById(eventId) {
    if (!eventId) {
        throw new Error("Erro: !")
    }
}

export async function createEvent(titulo, descricao, local_evento, imagem_chamada_buffer, imagem_chamada_name, imagem_capa_buffer, imagem_capa_name, criado_em, mesInicio, anoInicio, intervaloDatas) {
    if (!titulo, !descricao, !local_evento, !imagem_chamada_buffer, !imagem_chamada_name, !imagem_capa_buffer, !imagem_capa_name, !criado_em, !mesInicio, !anoInicio, !intervaloDatas) {
        throw new Error("Erro: Todos os dados devem ser informados!")
    }
    
    const imagem_chamada = await uploadPhotoToS3("events/chamada_evento", imagem_chamada_buffer, imagem_chamada_name)
    const imagem_capa = await uploadPhotoToS3("events/capa_evento", imagem_capa_buffer, imagem_capa_name)

    if (!imagem_capa || !imagem_chamada) {
        throw new Error("Erro: erro ao criar imagens!")
    }

    const event = await prisma.evento.create({
        data: {
            titulo,
            descricao,
            local_evento,
            imagem_chamada,
            imagem_capa,
            criado_em,
            mesInicio,
            anoInicio,
            IntervaloDatas: intervaloDatas
        }
    })
    
    return event
}   

export async function deleteEvent(eventId) {
    if (!eventId) {
        throw new Error("Erro: ID de evento não informado!")
    }

    const eventExists = await prisma.evento.findUnique({
        where: {
            idEvento: eventId
        }
    })

    if (!eventExists) {
        throw new Error("Erro: Evento não existe!")
    }
    
    const event = await prisma.evento.delete({
        where: {
            idEvento: eventId
        }
    })

    return event
}

export async function inactivateEvent(eventId) {
    const event = await prisma.evento.idEvento({
        where: {
            idEvento: eventId
        }
    })

    if (!event) {
        throw new Error("Erro: Evento não existe!")
    }

    const eventUpdated = await prisma.evento.update({
        where: {
            idEvento: eventId
        },
        data: {
            ativo: false
        }
    })

    return eventUpdated
}

