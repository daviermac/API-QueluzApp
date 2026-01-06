import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) {
        console.log("Token não recebido")
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        // if (err) return res.status(403).json({
        //     error: true,
        //     message: "Token não recebido, ou inválido!"
        // })
        if (err) {
            console.log("Token inválido ou não recebido!")
        }
    })

    next()
}   
