import React from 'react'
import personService from '../services/persons.js'

const Details = ({myKey, name, number, filter, deleteName}) => {
  /*const test = () => {
    if (window.confirm(`Do you want to delete ${name} from the directory?`)){
      personService
        .deletion(myKey)
        .then(persons => {
          //setPersons(persons => persons.filter((_,index) =>  index!== myKey-1))
          // setPersons(persons => persons.map(person => person.filter(person.name !== name)))
          console.log("deleted")
          console.log("persons.name is ",  persons.name)
          console.log(`myKey is ${myKey}`)
        })
    }
    else {
      alert(`${name} has not been deleted`)
    }
  }*/

  if (filter == ''){ //return full list if filter is blank
    return (
      <div className='info'>
        {name} {number} 
        <button onClick={() => deleteName(myKey,name)}>delete</button>
      </div>
    )
  }
  else if (name.toLowerCase().includes(filter.toLowerCase())) { //if filter field not empty, return the names with the filter
    return (
      <div className='info'>
        {name} {number} 
        <button onClick={() => deleteName(myKey,name)}>delete</button>
      </div>
    )
  }
}

export default Details