const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const dashCounter = (number) => {
	let counter = 0
	for (let index=0; index<number.length; index++){
		if (number[index] === '-') {
			counter++
		}
	}
	return counter
}

const specialCharacterCheck = (number) => {
	var format = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/
	return !format.test(number) //exclamation so that this returns true if there are no special characters other than '-'

}

const validator = [
	{
		validator: (number) => {
			if ((number.indexOf('-') === 2 || number.indexOf('-') === 3) && dashCounter(number)=== 1 && specialCharacterCheck(number)) { 
				// if '-' is at 2nd and 3rd index and there is only 1 '-' in the entire string (it splits into 2 parts if there is only 1 '-')
				return true
			}
			else {
				return false
			}
		},
		msg: 'Invalid number',
	},
]

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: validator, //must use the word 'validate:' for custom validators
		required: true
	}
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person' , personSchema)