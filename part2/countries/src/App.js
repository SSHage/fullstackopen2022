import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'
import DisplaySingle from './components/DisplaySingle'

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countriesToShow, setCountriesToShow] = useState([])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountriesToShow(countries) //reset countries back to original array everytime filter is changed
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setCountriesToShow(response.data) //this second array will be modified in the Display Component
      })
  }, [])


  const filteredCountries = countriesToShow.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

    return (
      <div>
        <form>
          <div> Find Countries 
            <input value={filter} onChange={handleFilterChange}></input>
          </div>
        </form>
        <div>
          {filter === '' 
          ? [] // if filter is blank, return a blank array
          : filteredCountries.length > 10
          ? <div> Too many searches, specify another filter</div> // if length of countriesToShow exceed 10, ask for specify another filter
          : filteredCountries.map(country => 
              filteredCountries.length == 1
          ? <DisplaySingle key = {country.cca3} country = {country} /> // if length is 1, show the detail of the single country
          : <Display key = {country.cca3} country = {country} setCountriesToShow = {setCountriesToShow} /> // if length does not exceed 10, show the countries
            )
          }
        </div>
      </div>
   )
  }

export default App;
