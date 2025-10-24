import express from 'express'
import { config } from 'dotenv'

const app = express()
config()

// Middlewares setting

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    next();
})

// Routing settings

import AuthController from './src/controllers/AuthController.js'
import UserController from './src/controllers/UserController.js'
import ViagemController from './src/controllers/ViagemController.js'

app.get("/", (req, res) => res.json({ mensagem: "API QueluzApp 2.0" }))
app.use("/auth", AuthController)
app.use("/user", UserController)
app.use("/viagem", ViagemController)

// Server instance

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
