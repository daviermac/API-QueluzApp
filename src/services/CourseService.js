import prisma from '../config/prisma.js'
import { uploadPhotoToS3 } from '../config/S3.js'

export async function listCourses() {
    const cursos = await prisma.curso.findMany()

    return cursos
}

export async function listCourseById(cursoId) {
    if (!cursoId) {
        throw new Error("Erro: ID não informado!")
    }
    
    const curso = await prisma.curso.findFirst({
        where: {
            idCurso: cursoId
        }
    })

    if (!curso) {
        throw new Error("Erro: Curso não existe!")
    }

    return curso
}

export async function createCourse(titulo, descricao, local_curso, fileBuffer, fileName, intervalo_datas) {
    if (!titulo, !descricao, !local_curso, !imagem_capa, !intervalo_datas) {
        throw new Error("Erro: Todos os campos são obrigatórios!")
    }

    const curso = await prisma.curso.create({
        titulo,
        descricao,
        local_curso,
        imagem_capa: imagem_url,
        intervalo_datas,
    })

    return curso
}

export async function editCourse(cursoId, titulo, descricao, local_curso, fileBuffer, fileName, intervalo_datas) {
    if (!cursoId) {
        throw new Error("Erro: ID do curso não informado!")
    }

    const cursoExists = await prisma.curso.findUnique({
        where: {
            idCurso: cursoId
        }
    })

    if (!cursoExists) {
        throw new Error("Erro: Curso não existe com esse ID!")
    }

    const key = await uploadPhotoToS3("curso", fileBuffer, fileName)

    const cursoEdited = await prisma.curso.update({
        where: {
            idCurso: cursoId
        },
        data: {
            titulo,
            descricao,
            local_curso,
            imagem_capa: key,
            intervalo_datas
        }
    })

    return cursoEdited
}

export async function deleteCourse() {

}
