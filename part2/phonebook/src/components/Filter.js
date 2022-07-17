import React from 'react'

const Filter = ({filter,handleFilterChange}) => {
    // console.log("Filter works")
    return(
      <form>
        <div>
          filter shown with  
          <input value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    )
  }

  export default Filter