import express from 'express'
import * as CourseService from '../services/CourseService.js'
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js'
import upload from '../config/multer.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get("/get", async (req, res) => {
    try {
        const courses = await CourseService.listCourses()

        res.json({
            error: false,
            message: 'Cursos listados com sucesso!',
            courses
        })
    } catch (error) {
        console.error(`Erro ao listar cursos: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar cursos: ${error.message}!`
        })
    }
})

router.get("/getFirstThree", async (req, res) => {
    try {
        const courses = await CourseService.listFirstThreeCourses()

        res.json({
            error: false,
            message: 'Cursos listados com sucesso!',
            courses
        })
    } catch (error) {
        console.error(`Erro ao listar cursos: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar cursos: ${error.message}!`
        })
    }
})


router.get("/get/:idCurso", async (req, res) => {
    const { idCurso } = req.params
    
    try {
        const course = await CourseService.listCourseById(idCurso)

        res.json({
            error: false,
            message: 'Curso listado com sucesso!',
            course
        })
    } catch (error) {
        console.error(`Erro ao listar curso: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar curso: ${error.message}!`
        })
    }
})

router.post("/create", authMiddleware, isAdminMiddleware, upload.fields([{ name: "imagem_principal", maxCount: 1 }, { name: "imagem_capa", maxCount: 1 }]), async (req, res) => {
    const { nome, titulo, descricao, link_inscricao } = req.body

    const capaBuffer = req.files.imagem_capa?.[0].buffer
    const principalBuffer = req.files.imagem_principal?.[0].buffer

    const capaNome = req.files.imagem_capa?.[0].originalname
    const principalNome = req.files.imagem_principal?.[0].originalname

    try {
        const courseCreated = await CourseService.createCourse(
            nome, titulo, descricao, link_inscricao, principalBuffer, principalNome, capaBuffer, capaNome
        )

        res.json({
            error: false,
            message: 'Curso criado com sucesso!',
            courseCreated
        })
    } catch (error) {
        console.error(`Erro ao listar curso: ${error.message}`)
        res.status(500).json({
            error: true,
            message: `Erro ao listar curso: ${error.message}!`
        })
    }
})

router.put("/edit/:idCurso", authMiddleware, isAdminMiddleware, async (req, res) => {

})

router.delete("/delete/:idCurso", authMiddleware, isAdminMiddleware, async (req, res) => {

})

export default router
