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

export async function createCourse(nome, titulo, descricao, link_inscricao, imagem_chamada_buffer, imagem_chamada_name, imagem_capa_buffer, imagem_capa_name) {
    if (!titulo, !descricao, !link_inscricao, !imagem_chamada_buffer, !imagem_chamada_name, !imagem_capa_buffer, !imagem_capa_name) {
        throw new Error("Erro: Todos os dados devem ser informados!")
    }
    
    const imagem_chamada = await uploadPhotoToS3("courses/imagem_chamada", imagem_chamada_buffer, imagem_chamada_name)
    const imagem_capa = await uploadPhotoToS3("courses/imagem_capa", imagem_capa_buffer, imagem_capa_name)

    if (!imagem_capa || !imagem_chamada) {
        throw new Error("Erro: erro ao criar imagens!")
    }

    const course = await prisma.curso.create({
        data: {
            titulo,
            descricao,
            link_inscricao,
            imagem_principal: imagem_chamada,
            imagem_capa
        }
    })
    
    return course
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
