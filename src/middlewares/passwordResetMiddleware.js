import bcrypt from 'bcrypt'
import prisma from '../config/prisma.js'

async function validateResetToken(token) {
    const [id, secret] = token.split(".")
    
    const tokenRecord = await prisma.passwordResetToken.findUnique({
      where: { idToken: id }
    });

    if (!tokenRecord) return false;
    
    const match = await bcrypt.compare(secret, tokenRecord.token)
    if (!match) return false    
    
    if (tokenRecord.jaUsado) return false;
    
    if (tokenRecord.expiresAt < new Date()) return false;

    return true;
}

export async function passwordResetMiddleware(req, res, next) {
    const { token } = req.params

    if (!token) {
        return res.status(401).send("Token não informado!")
    }

    const tokenRecord = await validateResetToken(token)

    if (!tokenRecord) {
        return res.status(400).send("Token inválido ou expirado!")
    }

    req.resetToken = tokenRecord
    next()
}
