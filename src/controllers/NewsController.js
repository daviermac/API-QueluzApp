import express from 'express'
import upload from '../config/multer.js'
import * as NewsService from '../services/NewsService.js'

const router = express.Router()

router.post("/", upload.single("imagem-principal"), async (req, res) => {
    try {
        const { title, body, categoryId, author } = req.body

        if (!req.file) {
            return res.status(400).json({
                error: true,
                message: "Imagem é obrigatória"
            })
        }

        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        
        if (!title || !body) {
            return res.status(400).json({
                error: true,
                message: 'Título e corpo são obrigatórios'
            })
        }
        
        const news = await NewsService.createNews(
            title, 
            body, 
            fileBuffer,
            fileName,
            categoryId, 
            author
        )
        
        return res.status(201).json({
            error: false,
            message: "Notícia criada com sucesso!",
            data: news
        })
    } catch (error) {
        console.error("Erro ao criar notícia", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})


router.get("/", async (req, res) => {
    try {
        const news = await NewsService.listAllNews()
        return res.json({
            error: false,
            data: news
        })
    } catch (error) {
        console.error("Erro ao listar notícias", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

router.post("/category", async (req, res) => {
    try {
        const { name } = req.body
        
        if (!name) {
            return res.status(400).json({
                error: true,
                message: 'Nome da categoria é obrigatório'
            })
        }
        
        const category = await NewsService.createCategory(name)
        return res.status(201).json({
            error: false,
            message: "Categoria criada com sucesso!",
            data: category
        })
    } catch (error) {
        console.error("Erro ao criar categoria", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

router.get("/category", async (req, res) => {
    try {
        const categories = await NewsService.listAllCategories()
        return res.json({
            error: false,
            data: categories
        })
    } catch (error) {
        console.error("Erro ao listar categorias", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

router.delete("/category/:id", async (req, res) => {
    try {
        const { id } = req.params
        
        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'ID da categoria é obrigatório'
            })
        }
        
        const category = await NewsService.deleteCategory(parseInt(id))
        return res.json({
            error: false,
            message: "Categoria deletada com sucesso!",
            data: category
        })
    } catch (error) {
        console.error("Erro ao deletar categoria", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

export default router