import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.kinghost.net',
    port: 465,
    secure: true,   
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

async function sendEmail(dest, titulo, corpo, html) {
    const info = await transporter.sendMail({
        from: `Q-Fácil - ${process.env.EMAIL_USER}`,
        to: dest,
        subject: titulo,
        text: corpo,
        html
    })

    if (!info.messageId) {
        return false
    }

    return true
}

export default sendEmail
