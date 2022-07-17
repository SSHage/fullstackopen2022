import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NameNumberForm from './components/NameNumberForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Message from './components/Message'


import './index.css'


const App = () => {
  /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '92105562', id: 1 },
    { name:'Benjamin Frank', number: '97923306', id:2},
    { name:'Bill Jackins', number: '97628354', id:3},
    { name:'Pete McQueen', number: '90182933', id:4},
    { name:'Benedict Oregano', number: '90182133', id:5},
    { name:'Robert Langdon', number: '90182933', id:6},
    { name: 'Linda Birkins', number: '82013398', id:7}
  ]) */

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => { //to initiate website with person from db.json
    personService
      .getData() // this is axios.get from server
      .then(initialPerson => { //initial person is response.data from axios.get
        setPersons(initialPerson)
      })
  }, [])
  // useEffect(hook, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      // id: persons.length +1, //let the server generated the id for you!
    }
  
    const alrPresent = persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) //checks if element within persons array is same as newName
    
    if (!alrPresent){  //if false, newName does not exist within array yet so add it in
      personService
        .create(nameObject) //this is axios.post on server
        .then(newPerson => { //newPerson is equivalent to response.data from axios.post which is the full object with name, number and id
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          /*setAddedMessage(
            `'${nameObject.name}' has been added to the server.`
          )*/
          setMessage(
            `Added '${newPerson.name}'`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

      }
    else if (alrPresent) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const idToBeUpdated = persons.findIndex(person => person.name == newName) + 1 //+1 since the actual id is array position +1
        const personToBeUpdated = persons.find(person => person.id == idToBeUpdated) //create array of just the person to be updated
        const updatedPerson = {...personToBeUpdated, number:newNumber} //updates the object for the person
        //console.log(updatedPerson)
        personService
          .update(idToBeUpdated,updatedPerson) //update the entire person's object into the array
          .then(response => {
            const updatedPersons = persons.map((person) =>
            person.id == idToBeUpdated
            ? updatedPerson //return the updated person if the person.id corresponds to the one to be updated
            : person //return the same person if person.id is not the id to be updated
          );
          setPersons(updatedPersons);
          })
        //alert(`${newName}'s phone number has been updated.`)
      }
    }
  }

  const deleteName = (id, name) => {
    if (window.confirm(`Do you want to delete ${name} from the directory?`)) {
      personService
        .deletion(id)
        .then((response) => {
          const updatedPersons = persons.filter((person) => person.id !== id) //filter out the person who's ID corresponds to the ID being removed
          setPersons(updatedPersons)
          console.log(`${name} has been removed from the directory`)
      })
      .catch(error => {
        setMessage(
          `Information of '${name}' has already been removed from server.`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })

    }
    else {
      console.log(`${name} has not been removed from directory`)
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
        <Filter 
          filter={filter} handleFilterChange={handleFilterChange}
        />
      <h2> add a new</h2>
        <NameNumberForm addName = {addName} 
          newName = {newName} handleNameChange = {handleNameChange}
          newNumber = {newNumber} handleNumberChange = {handleNumberChange}
        />
      <h2>Numbers</h2>
        <Persons 
          persons = {persons} filter = {filter} deleteName={deleteName}
        />
      ...
    </div>
  )
}

export default App