const express = require('express')
const cors = require('cors')

const app = express()

// CORS
app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// IMAGENS
app.use(express.static('public'))

// ROTAS
const UserRoutes = require('./ROUTES/UserRoutes');

app.use('/users', UserRoutes)

app.listen(5000)
