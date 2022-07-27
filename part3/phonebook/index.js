require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require ('cors')
const Person = require('./models/person')

app.use(express.static('build')) //to launch production build for frontend
app.use(cors())
app.use(express.json())

//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :details'))

morgan.token('details', request => {
	let person = request.body
	//console.log(request.body)
	return JSON.stringify(person)
})
  
app.get('/info', (request, response, next) => {
	/*let personLength = persons.length
    response.write("<div>Phonebook has info for " + personLength + " people</div>")
    response.write("<div>" + Date() + "</div>")
    response.send()*/

	Person.find({}) //find all persons to determine the length
		.then(person => {
			response.send(
				`<div>Phonebook has info for ${person.length} people</div>
          <div>Correct as of ${new Date()}</div>`
			)
		})
		.catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
	Person.find({})
		.then(person =>{
			response.json(person)
		})
		.catch(error => next(error))
})

app.get('/api/persons/:id', (request,response,next) => {
	Person.findById(request.params.id)
		.then(person => {
			response.json(person)
		})
		.catch(error => next(error))

	/* const id = Number(request.params.id) //the default request.params.id is a string
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    } 
    else {
        response.status(404).end()
    }*/
})

app.delete('/api/persons/:id', (request, response, next) => {
	/*const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id) //creates a new array whereby the id has been deleted*/
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
	const body = request.body 
	//json parser takes json data, transform it to javascript object and attaches it to body property of request object
	// take note that there should not be a comma in the final line of the request.body rest doc
    
	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPerson => {
			console.log('getting saved')
			response.json(savedPerson)
		})
		.catch((error) => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
	const {name, number} = request.body

	Person.findByIdAndUpdate(
		request.params.id, 
		{name, number}, 
		{new:true, runValidators: true, context: 'query'}
	) //new:true returns modified file
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)
  
const errorHandler = (error, request, response, next) => {
	console.error(error.message)
  
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} 
	else if (error.name === 'ValidationError'){
		return response.status(400).json({ error: error.message})
	}
  
	next(error)
}
  
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { //this message is what appears on the cmd Terminal
	console.log(`Server running on port ${PORT}`)
})