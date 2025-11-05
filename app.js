import express from 'express'
import { config } from 'dotenv'
import OS from 'os'

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
import CarController from './src/controllers/CarController.js'
import RequestsController from './src/controllers/RequestsController.js'

app.get("/", (req, res) => res.json({ mensagem: "API QueluzApp 2.0" }))
app.use("/auth", AuthController)
app.use("/user", UserController)
app.use("/viagem", ViagemController)
app.use("/car", CarController)
app.use("/request", RequestsController)

// Server instance

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    const networkInterfaces = OS.networkInterfaces()
    console.log(`Servidor rodando em http://${networkInterfaces.Ethernet[1].address}:${PORT}`)
})
