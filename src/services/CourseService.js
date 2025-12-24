import prisma from '../config/prisma.js'
import { getSignedDownloadUrl, uploadPhotoToS3 } from '../config/S3.js'

export async function listCourses() {
    const cursos = await prisma.curso.findMany()

    const coursesWithImage = await Promise.all(
        cursos.map(async (req) => {
            const principalSignedUrl = await getSignedDownloadUrl(req.imagem_principal)
            const capaSignedUrl = await getSignedDownloadUrl(req.imagem_capa)
            
            return {
                ...req,
                imagem_principal_link: principalSignedUrl,
                imagem_capa_link: capaSignedUrl
            }
        })
    )

    return coursesWithImage
}

export async function listFirstThreeCourses() {
    const cursos = await prisma.curso.findMany({
        take: 3
    })

    const coursesWithImage = await Promise.all(
        cursos.map(async (req) => {
            const principalSignedUrl = await getSignedDownloadUrl(req.imagem_principal)
            const capaSignedUrl = await getSignedDownloadUrl(req.imagem_capa)
            
            return {
                ...req,
                imagem_principal_link: principalSignedUrl,
                imagem_capa_link: capaSignedUrl
            }
        })
    )

    return coursesWithImage
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

    const cursoComImage = {
        ...curso,
        imagem_principal_link: await getSignedDownloadUrl(curso.imagem_principal),
        imagem_capa_link: await getSignedDownloadUrl(curso.imagem_capa)
    }

    
    return cursoComImage
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
