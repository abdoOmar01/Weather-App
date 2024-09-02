import PropTypes from 'prop-types'

import './Forecast.css'

const Forecast = ({ data, img }) => {
  console.log(data)
  return (
    <section id="forecast">
    <img src={img} alt="Weather Forecast" />
    <table>
      <caption>
        <span></span>
        5-day forecast
      </caption>
      <tbody>
        {data.map(day => {
          const [, m, d] = day.date.split('-')

          return (
            <tr key={day.date}>
              <td className='icon-cell'><span></span></td>
              <td>{`${m}/${d}`}</td>
              <td>{day.maxtempC}<sup>&deg;</sup> / {day.mintempC}<sup>&deg;</sup></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </section>
  )
}

Forecast.propTypes = {
  data: PropTypes.array,
  img: PropTypes.string
}

export default Forecast