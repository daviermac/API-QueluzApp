import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) {
        return res.status(401).json({
            error: true,
            message: "Token não recebido!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(403).json({
            error: true,
            message: "Token inválido!"
        })
    }
}   
