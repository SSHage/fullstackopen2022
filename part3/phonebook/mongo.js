const mongoose = require ('mongoose')

if (process.argv.length <3) { // 'node','mongo.js', 'password', 'name to be added', 'number are all part of process.argv
    console.log('Please provide the following as arguments: node mongo.js <password> <name to be added> <number>')
    process.exit(1)
}

const password = process.argv[2]
const nameToBeAdded = process.argv[3]
const numberToBeAdded = process.argv[4]

const url = `mongodb+srv://SSH:${password}@cluster0.tyuyj.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 5){
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected!')

            const person = new Person({
                name: nameToBeAdded,
                number: numberToBeAdded
            })
            return person.save()
        })
        .then(() => {
            console.log(`added ${nameToBeAdded} number ${numberToBeAdded} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    }

else if (process.argv.length == 3 && password != ""){
    mongoose
        .connect(url)
        console.log("phonebook:")
        Person
            .find({})
            .then(persons => {
            persons.forEach(person => {
                console.log(person.name + " " + person.number)
            })
            mongoose.connection.close()
        })
}