import prisma from '../config/prisma.js'
import { uploadPhotoToS3 } from '../config/S3.js'

const public_bucket_url = process.env.PUBLIC_BUCKET_URL

export async function listCourses() {
    const cursos = await prisma.curso.findMany()

    cursos.map((curso) => {
        curso.imagem_principal = `${public_bucket_url}/${curso.imagem_principal}`
        curso.imagem_capa = `${public_bucket_url}/${curso.imagem_capa}`
    })

    return cursos
}

export async function listFirstThreeCourses() {
    const cursos = await prisma.curso.findMany({
        take: 3
    })

    cursos.map((curso) => {
        curso.imagem_principal = `${public_bucket_url}/${curso.imagem_principal}`
        curso.imagem_capa = `${public_bucket_url}/${curso.imagem_capa}`
    })

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

    curso.imagem_principal = `${public_bucket_url}/${curso.imagem_principal}`
    curso.imagem_capa = `${public_bucket_url}/${curso.imagem_capa}`

    return curso
}

export async function createCourse(nome, titulo, descricao, link_inscricao, imagem_chamada_buffer, imagem_chamada_name, imagem_capa_buffer, imagem_capa_name) {
    if (!nome, !titulo, !descricao, !link_inscricao, !imagem_chamada_buffer, !imagem_chamada_name, !imagem_capa_buffer, !imagem_capa_name) {
        throw new Error("Erro: Todos os dados devem ser informados!")
    }
    
    const imagem_chamada = await uploadPhotoToS3("courses/imagem_chamada", imagem_chamada_buffer, imagem_chamada_name)
    const imagem_capa = await uploadPhotoToS3("courses/imagem_capa", imagem_capa_buffer, imagem_capa_name)

    if (!imagem_capa || !imagem_chamada) {
        throw new Error("Erro: erro ao criar imagens!")
    }

    const course = await prisma.curso.create({
        data: {
            nome,
            titulo,
            descricao,
            link_inscricao,
            imagem_principal: imagem_chamada,
            imagem_capa,
            criado_em: new Date()
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
