import prisma from '../config/prisma.js'
import { uploadNewsPhotoToS3 } from '../config/S3.js'

export async function createNews(title, body, fileBuffer, fileName, category, author) {
    try {
        const key = await uploadNewsPhotoToS3(fileBuffer, fileName)

        const news = await prisma.noticia.create({
            data: {
                titulo: title,
                corpo: body,
                imagemUrl: key, // salva apenas o caminho
                categoria: category,
                autor: author
            }
        })

        return news
    } catch (error) {
        throw new Error(`Erro ao criar notícia: ${error.message}`)
    }
}

export async function listAllNews() {
    const news = await prisma.noticia.findMany()

    return news
}

export async function getNewsById(newsId) {
    const news = await prisma.noticia.findUnique({
        where: {
            id: newsId
        }
    })

    if (!news) {
        throw new Error("Erro: notícia não encontrada!")
    }

    return news
}

export async function editNews(newsId, title, body, fileBuffer, fileName, category, author) {
    if (!newsId) {
        throw new Error("Erro: ID da notícia não informado!")
    }

    const key = await uploadNewsPhotoToS3(fileBuffer, fileName)

    const updatedNews = await prisma.noticia.update({
        where: {
            id: newsId
        },
        data: {
            titulo: title,
            corpo: body,
            imagemUrl: key,
            categoria: category,
            autor: author
        }
    })

    return updatedNews
}

export async function deleteNews(newsId) {
    if (!newsId) {
        throw new Error("Erro: ID da notícia não informado!")
    }

    const deletedNews = await prisma.noticia.delete({
        where: {
            id: newsId
        }
    })

    return deletedNews
}
