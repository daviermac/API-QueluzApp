import prisma from '../config/prisma.js'
import { getSignedDownloadUrl, uploadPhotoToS3 } from '../config/S3.js'

const public_bucket_url = process.env.PUBLIC_BUCKET_URL

export async function createNews(title, body, fileBuffer, fileName, category, author) {
    try {
        const key = await uploadPhotoToS3("news", fileBuffer, fileName)

        const news = await prisma.noticia.create({
            data: {
                titulo: title,
                corpo: body,
                imagemUrl: key, // salva apenas o caminho
                categoria: category,
                autor: author,
                publicadaEm: new Date()
            }
        })

        return news
    } catch (error) {
        throw new Error(`Erro ao criar notícia: ${error.message}`)
    }
}

export async function listAllNews() {
    const news = await prisma.noticia.findMany({
        orderBy: {
            publicadaEm: 'desc'
        }
    })

    news.map((news) => {
        news.imagemUrl = `${public_bucket_url}/${news.imagemUrl}`
    })
    

    return news
}

export async function listFirstFiveNews() {
    const newsList = await prisma.noticia.findMany({
        orderBy: {
            publicadaEm: 'desc'
        },
        take: 5
    })

    newsList.map((news) => {
        news.imagemUrl = `${public_bucket_url}/${news.imagemUrl}`
    })
    

    return newsList
}

export async function getNewsById(newsId) {
    const news = await prisma.noticia.findUnique({
        where: {
            idNoticia: newsId
        }
    })

    if (!news) {
        throw new Error("Erro: notícia não encontrada!")
    }

    news.imagemUrl = `${public_bucket_url}/${news.imagemUrl}`

    return news
}

export async function editNews(newsId, title, body, fileBuffer, fileName, category, author) {
    if (!newsId) {
        throw new Error("Erro: ID da notícia não informado!")
    }

    const key = await uploadPhotoToS3("news", fileBuffer, fileName)

    const updatedNews = await prisma.noticia.update({
        where: {
            idNoticia: newsId
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
            idNoticia: newsId
        }
    })

    return deletedNews
}
