import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import sendEmail from '../config/emailservice.js'

export async function login(cpf, senha) {
    if (!cpf || !senha) {
        throw new Error("Erro: Dados Obrigatórios!")
    }

    const user = await prisma.usuario.findUnique({
        where: {
            cpf
        }
    })

    if (!user) {
        throw new Error("Erro: Usuário não encontrado!")
    }

    const correctPassword = await bcrypt.compare(senha, user.senha)

    if (!correctPassword) {
        throw new Error("Erro: Credenciais incorretas!")
    }   

    const SECRET = process.env.SECRET

    const token = jwt.sign({
        user: user,
    }, SECRET)

    return { user, token }
}       

export async function forgottenPassword(email) {
    const user = await prisma.usuario.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        throw new Error("Erro: nenhum usuário encontrado com este e-mail!")
    }

    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = await bcrypt.hash(rawToken, 10)
    const expiraEm = new Date(Date.now('pt-br') + 15 * 60 * 1000)

    const tokenCriado = await prisma.passwordResetToken.create({
        data: {
            token: tokenHash,
            idUsuario: user.idUsuario,
            expiraEm
        }
    })

    const linkDev = `http://192.168.2.98:8080/auth/reset-password/${tokenCriado.idToken}.${rawToken}`
    const link = `https://api.queluz.sp.gov.br/auth/reset-password/${tokenCriado.idToken}.${rawToken}`

    const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
        <meta charset="UTF-8">
        <title>Recuperação de Senha - Queluz +</title>
        <style>
            body {
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background-color: #F5F5F7;
            color: #333;
            }
            .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px 30px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            text-align: center;
            }
            .logo {
            width: 150px;
            margin-bottom: 30px;
            }
            h1 {
            font-size: 22px;
            color: #0C447F;
            margin-bottom: 20px;
            }
            p {
            font-size: 14px;
            margin-bottom: 30px;
            line-height: 1.5;
            }
            .button {
            display: inline-block;
            background-color: #0C447F;
            color: #fff;
            text-decoration: none;
            padding: 14px 24px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 16px;
            transition: background-color 0.2s;
            }
            .button:hover {
            background-color: #083163;
            }
            .footer {
            margin-top: 40px;
            font-size: 10px;
            color: #888;
            line-height: 1.4;
            }
            .footer a {
            color: #0C447F;
            text-decoration: none;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <img src="https://pmq-bucket-publico.s3.us-east-2.amazonaws.com/logo_queluz_gradiente.png" class="logo"/>
            <h1>Recuperação de senha</h1>
            <p>Você solicitou a recuperação da senha da sua conta. Clique no botão abaixo para redefinir sua senha. Este link é válido por 1 hora e só pode ser usado uma vez.</p>
            <a href="${linkDev}" class="button">Redefinir minha senha</a>
            <p style="margin-top: 20px; font-size: 12px; color: #555;">
            Se você não solicitou a recuperação de senha, recomendamos que troque sua senha.
            </p>
            <div class="footer">
            <p>Desenvolvido por Diretoria de Tecnologia da Informação e Secretaria de Comunicação</p>
            <p>Prefeitura Municipal de Queluz</p>
            <p><a href="http://localhost:3000">www.queluz.sp.gov.br</a></p>
            </div>
        </div>
        </body>
        </html>
    `

    await sendEmail(email, "Recuperação de senha", null, html)

    return link
}       

export async function resetPassword(token, password) {
    const [id, tokenBody] = token.split(".")

    const tokenExists = await prisma.passwordResetToken.findUnique({
        where: {
            idToken: id
        }
    })

    if (!tokenExists) {
        throw new Error("Erro: token inválido ou inexistente!")
    }

    const match = await bcrypt.compare(tokenBody, tokenExists.token)

    // const tokenExists = await prisma.passwordResetToken.findFirst({
    //     where: {
    //         token,
    //         jaUsado: false,
    //         expiraEm: { gt: new Date() }
    //     }
    // })
    
    if (!match) {
        throw new Error("Erro: token inválido ou inexistente!")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userUpdated = await prisma.usuario.update({
        where: {
            idUsuario: tokenExists.idUsuario
        },
        data: {
            senha: hashedPassword
        }
    })

    await prisma.passwordResetToken.update({
        where: {
            idToken: tokenExists.idToken
        },
        data: {
            jaUsado: true
        }
    })

    return userUpdated
}       