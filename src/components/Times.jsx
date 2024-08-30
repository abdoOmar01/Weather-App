import PropTypes from 'prop-types'

import './Times.css'

const Times = ({ moonrise, moonset, sunrise, sunset }) => {
  return (
    <section id="times">
      <table>
        <tbody>
          <tr>
            <td>Moonrise</td>
            <td className='time'>{moonrise}</td>
          </tr>
          <tr>
            <td>Moonset</td>
            <td className='time'>{moonset}</td>
          </tr>
          <tr>
            <td>Sunrise</td>
            <td className='time'>{sunrise}</td>
          </tr>
          <tr>
            <td>Sunset</td>
            <td className='time'>{sunset}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

Times.propTypes = {
  moonrise: PropTypes.string,
  moonset: PropTypes.string,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
}

export default Times