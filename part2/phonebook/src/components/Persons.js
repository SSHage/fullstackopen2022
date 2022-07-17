import React from "react";
import Details from './Details'; // remember to import the component you require

const Persons = ({persons, filter, deleteName}) => {
    return(
      <div>
        <div>
          {persons.map(person =>
            <Details 
              myKey ={person.id} key={person.id} name={person.name} 
              number={person.number} filter={filter}
              deleteName = {deleteName}
            /> 
          )} 
        </div>
      </div>
    )
  }

export default Persons