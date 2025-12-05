import prisma from '../config/prisma.js'

export async function createNews(title, body, filePath, fileName, contentType, categoryId, author) {
    try {
        // Gera URL acessável pelo front
        const imageUrl = `/news/${fileName}`

        const news = await prisma.noticia.create({
            data: {
                titulo: title,
                corpo: body,
                imagem: imageUrl, // salva apenas o caminho
                categoriaId: Number(categoryId),
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

export async function listNewsByCategory(category) {
    const news = await prisma.noticia.findMany({
        where: {
            categoria: category
        }
    })

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

export async function editNews(newsId, title, body, image, category, author) {
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
