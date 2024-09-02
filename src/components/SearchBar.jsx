import { useState } from "react"
import PropTypes from 'prop-types'

import './SearchBar.css'

const SearchBar = ({ cities, cityHandler }) => {
  const [query, setQuery] = useState('')
  const [filteredCities, setFilteredCities] = useState([])

  const handleChange = e => {
    const input = e.target.value
    setQuery(input)

    const citiesToShow = cities.filter(c => c.name.toLowerCase().includes(input.toLowerCase()))
    setFilteredCities(citiesToShow)
  }

  const handleSelection = e => {
    cityHandler(e.target.innerText)
  }

  return (
    <div id="search-bar">
      <input id="s" type="text" placeholder="Search for your city..."
        value={query} onChange={handleChange}
        autoComplete="off" />
      {filteredCities.length > 0 && (
        <ul className="suggestions">
          {filteredCities.map(c =>
            <li key={c.iso2} onClick={handleSelection}>{c.name}</li>
          )}
        </ul>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  cities: PropTypes.array,
  cityHandler: PropTypes.func
}

export default SearchBar