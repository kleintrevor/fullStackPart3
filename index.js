console.log("hello world")
// const { truncate } = require('fs')
// const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

/*
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
})
*/
const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId +1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId,
    }

    notes = notes.concat(note)
    response.json(note)

    note = request.body
    note.id = maxId + 1

    notes = notes.concat(note)
    
    response.json(note)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello world!</h1>')
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)

    if (note){
        response.json(note)
    } else {
        response.status(404).end()
    }
    console.log(note)
    response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    
    response.status(204).end()
})


let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methds of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

const PORT = 3001
app.listen(PORT)
// console.log(`Server running on port ${PORT}`)