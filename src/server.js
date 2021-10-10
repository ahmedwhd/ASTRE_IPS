const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const etudiants = require('./server/nvDonnees.json')


app.get('/etudiants', (req,res) => {
    res.status(200).json(etudiants)
})

app.listen(3005, () => {
    console.log("Serveur à l'écoute")
})