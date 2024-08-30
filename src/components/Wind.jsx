import PropTypes from 'prop-types'

import './Wind.css'

const Wind = ({ img, dir, speed}) => {
  const getDirection = code => {
    const compassDict = {
      "N": "North",
      "NNE": "North-northeast",
      "NE": "Northeast",
      "ENE": "East-northeast",
      "E": "East",
      "ESE": "East-southeast",
      "SE": "Southeast",
      "SSE": "South-southeast",
      "S": "South",
      "SSW": "South-southwest",
      "SW": "Southwest",
      "WSW": "West-southwest",
      "W": "West",
      "WNW": "West-northwest",
      "NW": "Northwest",
      "NNW": "North-northwest"
    }

    return compassDict[code.toUpperCase()]
  }

  return (
    <section id="wind">
      <img src={img} alt="wind" />
      <div>
        <p>{getDirection(dir)}</p>
        <p>{speed} km/h</p>
      </div>
    </section>
  )
}

Wind.propTypes = {
  img: PropTypes.string,
  dir: PropTypes.string,
  speed: PropTypes.string
}

export default Wind