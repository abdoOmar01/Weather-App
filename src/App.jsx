import { useState } from 'react'
import { useEffect } from 'react'
import { feature } from '@rapideditor/country-coder'
import axios from 'axios'

import Forecast from './components/Forecast'
import Details from './components/Details'
import Wind from './components/Wind'
import Times from './components/Times'
import Air from './components/Air'

import './App.css'

import forecastImg from './assets/forecast 2.png'
import detailsImg from './assets/details.png'
import windImg from './assets/wind 2.png'
import leafImg from './assets/leaf.png'

function App() {
  const [country, setCountry] = useState('')
  //const [cities, setCitites] = useState([])
  const [currentCondition, setCurrentCondition] = useState(null)
  const [forecast, setForecast] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude
      const country = feature([latitude, longitude]).properties.nameEn

      setCountry(country)

      // axios.post(`${import.meta.env.VITE_CITIES_API}`, { country })
      //   .then(response => {
      //     setCitites(response.data.data.states)
      //   })

      axios.get(`${import.meta.env.VITE_WEATHER_API}` +
                `?key=${import.meta.env.VITE_API_KEY}` +
                `&q=${country}` +
                `&aqi=yes&num_of_days=5&format=json`)
            .then(response => {
              setCurrentCondition(response.data.data.current_condition[0])
              setForecast(response.data.data.weather)
              console.log(response.data.data)
              console.log(typeof forecastImg)
            })
    })
  }, [])

  if (!currentCondition) return <></>

  return (
    <>
      <header>
        <h1>{country}</h1>

        <section>
          <h1>{currentCondition.temp_C}<sup>&deg;C</sup></h1>
          <div>
            <p>{currentCondition.weatherDesc[0].value}
              <span>{forecast[0].maxtempC}<sup>&deg;</sup> / {forecast[0].mintempC}
                <sup>&deg;</sup></span>
            </p>
          </div>
        </section>
      </header>

      <main>
        <Forecast data={forecast} img={forecastImg} />

        <Details humidity={currentCondition.humidity} feel={currentCondition.FeelsLikeC}
          uv={currentCondition.uvIndex} pressure={currentCondition.pressure}
          chanceOfRain={forecast[0].hourly[0].chanceofrain}
          img={detailsImg} />

        <section id="others">
          <Wind img={windImg} dir={currentCondition.winddir16Point}
            speed={currentCondition.windspeedKmph} />

          <Times moonrise={forecast[0].astronomy[0].moonrise}
            moonset={forecast[0].astronomy[0].moonset}
            sunrise={forecast[0].astronomy[0].sunrise}
            sunset={forecast[0].astronomy[0].sunset} />
        </section>

        <Air img={leafImg} co={currentCondition.air_quality.co}
          no2={currentCondition.air_quality.no2}
          o3={currentCondition.air_quality.o3}
          pm10={currentCondition.air_quality.pm10}
          pm2_5={currentCondition.air_quality.pm2_5}
          so2={currentCondition.air_quality.so2} />
      </main>
    </>
  )
}

export default App
