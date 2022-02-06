const { response } = require("express")
const express = require("express")

const app = express()
app.use(express.json())
const PORT = 3001

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

//Get all
app.get("/api/persons", (req, res) => {
 res.send(persons)
})

//Post
app.post("/api/persons/", (req, res) => {
 const { name, number } = req.body

 if (!name) {
  return res.status(400).json({ message: "Name is required" })
 }

 if (!number) {
  return res.status(400).json({ message: "Number is required" })
 }

 console.log(persons.indexOf(name))
 if (persons.indexOf(name) < 0) {
  return res.status(400).json({ message: "Name must be unique" })
 }
 const newPerson =
  persons.length > 0 ? Math.floor(Math.random() * (1000 - 1) + 1) : 0
 persons.push({
  id: newPerson,
  name: name,
  number: number,
 })
 return res.status(200).json({ message: "Person created", persons })
})

//Retrieve

app.get("/api/persons/:id", (req, res) => {
 const personID = Number(req.params.id)
 const person = persons.find((item) => item.id === personID)
 if (!person) {
  return res.status(404).json({ error: "Not person found" })
 }
 return res.status(200).json(person)
})

//Delete
app.delete("/api/persons/:id", (req, res) => {
 const nodeId = Number(req.params.id)
 const personIndex = persons.findIndex((item) => item.id === nodeId)

 persons.splice(personIndex, 1)

 return res.status(200).json(persons)
})

app.listen(PORT, () => {
 console.log("Server is running with express")
})
