const express = require('express')
const cors = require('cors')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:5173']
}))

// Servir arquivos estáticos
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./ROUTES/UserRoutes')
const PetRoutes = require('./ROUTES/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

// Iniciar servidor
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
