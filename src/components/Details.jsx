import PropTypes from 'prop-types'

import './Details.css'

const Details = ({ humidity, feel, uv, pressure, chanceOfRain, img }) => {
  return (
    <section id="details">
      <img src={img} alt="Weather details" />
      <table>
        <caption>
          Weather Details
        </caption>
        <tbody>
          <tr>
            <td>Humidity</td>
            <td className='value'>{humidity}%</td>
          </tr>
          <tr>
            <td>Feels like</td>
            <td className='value'>{feel}&deg;</td>
          </tr>
          <tr>
            <td>UV</td>
            <td className='value'>{uv}</td>
          </tr>
          <tr>
            <td>Pressure</td>
            <td className='value'>{pressure} mbar</td>
          </tr>
          <tr>
            <td>Chance of rain</td>
            <td className='value'>{chanceOfRain}%</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

Details.propTypes = {
  humidity: PropTypes.string,
  feel: PropTypes.string,
  uv: PropTypes.string,
  pressure: PropTypes.string,
  chanceOfRain: PropTypes.string,
  img: PropTypes.string
}

export default Details