import prisma from '../config/prisma.js'

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

export async function createCourse(titulo, descricao, local_curso, imagem_url, intervalo_datas) {
    if (!titulo, !descricao, !local_curso, !imagem_capa, !intervalo_datas) {
        throw new Error("Erro: Todos os campos são obrigatórios!")
    }

    const curso = await prisma.curso.create({
        titulo,
        descricao,
        local_curso,
        imagem_capa: imagem_url,
        intervalo_datas
    })

    return curso
}

export async function editCourse(cursoId, titulo, descricao, local_curso, imagem_url, intervalo_datas) {

}

export async function deleteCourse() {

}
