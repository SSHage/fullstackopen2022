import React from 'react'

const Display = ({country, setCountriesToShow}) => {
        return(
            <div>
                {country.name.official} <button onClick ={() => setCountriesToShow([country])}>show</button>
            </div>
       )
    }

export default Display