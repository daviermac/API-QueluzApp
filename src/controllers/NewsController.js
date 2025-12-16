import express from 'express'
import upload from '../config/multer.js'
import * as NewsService from '../services/NewsService.js'

const router = express.Router()

router.post("/create", upload.single("imagem-principal"), async (req, res) => {
    try {
        const { title, body, category, author } = req.body

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
            category, 
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


router.get("/get", async (req, res) => {
    const auth = req.headers.authorization

    console.log(auth)

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

router.get("/get/:idNoticia", async (req, res) => {
    const { idNoticia } = req.params

    try {
        const news = await NewsService.getNewsById(idNoticia)
        
        return res.json({
            error: false,
            data: news
        })
    } catch (error) {
        console.error("Erro ao listar notícia", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

router.patch("/edit/:idNoticia", upload.single("imagem-principal"), async (req, res) => {
    const { idNoticia } = req.params
    const { title, body, category, author } = req.body
    const fileBuffer = req.file.buffer
    const fileName = req.file.originalname

    try {
        const updatedNews = await NewsService.editNews(idNoticia, title, body, fileBuffer, fileName, category, author)

        return res.json({
            error: false,
            data: updatedNews
        })
    } catch (error) {
        console.error("Erro ao editar notícia", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

router.delete("/delete/:idNoticia", async (req, res) => {
    const { idNoticia } = req.params
    
    try {
        const deletedNews = await NewsService.deleteNews(idNoticia)

        return res.json({
            error: false,
            data: deletedNews
        })
    } catch (error) {
        console.error("Erro ao excluir notícia", error.message)
        res.status(500).json({
            error: true,
            message: error.message
        })
    }
})

export default router
