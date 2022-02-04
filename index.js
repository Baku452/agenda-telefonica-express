const express = require("express")

const app = express()

const persons = [
 {
  id: 1,
  name: "Arto Hellas",
  number: "040-12456",
 },
 {
  id: 2,
  name: "Ada Lovelace",
  number: "39-44-5323523",
 },
 {
  id: 3,
  name: "Dan Abramov",
  number: "12-43-234545",
 },
 {
  id: 4,
  name: "Mary Poppendick",
  number: "39-23-6423121",
 },
]

app.get("/", (req, res) => {
 res.send("CRUD Agenda telefónica")
})

app.get("/info", (req, res) => {
 let hora = new Date()
 res.write(`Phonebook has info por ${persons.length} people
 ${hora}`)
 res.end()
})

app.get("/api/persons", (req, res) => {
 res.send(persons)
})

const PORT = 3001

app.listen(PORT, () => {
 console.log("Server is running with express")
})
