import prisma from '../config/prisma.js'
import { uploadFileToS3, deleteFileFromS3 } from '../config/S3.js'

export async function createNews(title, body, imageBuffer, imageFileName, contentType, categoryId, author) {
    try {
        let imageUrl = null
        
        // Se houver imagem, faz o upload para S3
        if (imageBuffer && imageFileName) {
            imageUrl = await uploadFileToS3(imageBuffer, imageFileName, contentType)
        }
        
        const news = await prisma.noticia.create({
            data: {
                titulo: title,
                corpo: body,
                imagem: imageUrl,
                categoriaId: categoryId,
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

export async function listNewsByCategory(categoryId) {
    const news = await prisma.noticia.findMany({
        where: {
            categoriaId: categoryId
        }
    })
    
    return news
}

export async function editNews(newsId, title, body, image, categoryId, author) {
    if (!newsId) {
        throw new Error("Erro: ID da notícia não informado!")
    }

    const updatedNews = await prisma.noticia.update({
        where: {
            id: newsId
        },
        data: {
            titulo: title,
            corpo: body,
            imagem: image,
            categoriaId: categoryId,
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

export async function createCategory(name) {
    if (!name) {
        throw new Error("Erro: Nome da categoria não informado!")
    }
    
    const category = await prisma.categoria.create({
        data: {
            nome: name
        }
    })

    return category
}

export async function deleteCategory(categoryId) {
    if (!categoryId) {
        throw new Error("Erro: ID da categoria não informado!")
    }

    const deletedCategory = await prisma.categoria.delete({
        where: {
            id: categoryId
        }
    })

    return deletedCategory
}

export async function editCategory(categoryId, name) {
    if (!categoryId) {
        throw new Error("Erro: ID da categoria não informado!")
    }

    const updatedCategory = await prisma.categoria.update({
        where: {
            id: categoryId
        },
        data: {
            nome: name
        }
    })

    return updatedCategory
}

export async function listAllCategories() {
    const categories = await prisma.categoria.findMany()

    return categories
}
