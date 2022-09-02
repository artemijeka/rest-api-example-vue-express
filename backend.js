const express = require('express')
const path = require('path')
const app = express()
const { v4 } = require('uuid')

app.use(express.json())//для работы с json в request в запросах

let CONTACTS = [
  { id: v4(), name: 'Artem', value: '+79967123456', marked: false }
]

// GET
app.get('/api/contacts', (req, res) => {
  // setTimeout(() => {
  res.status(200).json(CONTACTS)
  // }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = { ...req.body, id: v4(), marked: false }
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts', (req, res) => {
  const { id } = { ...req.body }
  CONTACTS = CONTACTS.filter(c => c.id !== id)

  // app.delete('/api/contacts/:id', (req, res) => {
  // console.log(req.params.id)
  // CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({ message: `Контакт удалён` })
})

// PUT
app.put('/api/contacts', (req, res) => {
  const { id } = { ...req.body }
  const index = CONTACTS.findIndex(c=>c.id===id)
  CONTACTS[index] = req.body
  res.status(200).json(CONTACTS[index])
})

// PATCH используется для частичного изменения ресурса.
// HEAD запрашивает ресурс так же, как и метод GET, но без тела ответа.
// OPTIONS используется для описания параметров соединения с ресурсом.

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3004, () => { console.log('Server started') })