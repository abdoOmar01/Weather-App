import PropTypes from 'prop-types'

import './Air.css'

const Air = ({ img, pm2_5, co, no2, o3, pm10, so2 }) => {
  return (
    <section id="air-quality">
      <div id="aqi">
        <img src={img} alt="leaf" />
        <p>AQI {pm2_5}</p>
      </div>

      <div id="aqi-details">
        <div className='gas'>
          <div className='name'>CO</div>
          <div className='value'>{co}</div>
        </div>
        <div className='gas'>
          <div className='name'>NO<sub>2</sub></div>
          <div className='value'>{no2}</div>
        </div>
        <div className='gas'>
          <div className='name'>O<sub>3</sub></div>
          <div className='value'>{o3}</div>
        </div>
        <div className='gas'>
          <div className='name'>PM2.5</div>
          <div className='value'>{pm2_5}</div>
        </div>
        <div className='gas'>
          <div className='name'>PM10</div>
          <div className='value'>{pm10}</div>
        </div>
        <div className='gas'>
          <div className='name'>SO<sub>2</sub></div>
          <div className='value'>{so2}</div>
        </div>
      </div>
    </section>
  )
}

Air.propTypes = {
  img: PropTypes.string,
  pm2_5: PropTypes.string,
  co: PropTypes.string,
  no2: PropTypes.string,
  o3: PropTypes.string,
  pm10: PropTypes.string,
  so2: PropTypes.string
}

export default Air