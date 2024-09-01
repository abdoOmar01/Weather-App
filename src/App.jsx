import { useState } from 'react'
import { useEffect } from 'react'
import { feature } from '@rapideditor/country-coder'

import SearchBar from './components/SearchBar'
import Forecast from './components/Forecast'
import Details from './components/Details'
import Wind from './components/Wind'
import Times from './components/Times'
import Air from './components/Air'
import Chart from './components/Chart'

import weatherService from './services/weatherService'
import countryService from './services/countryService'

import './App.css'

import loadingImg from './assets/loading.gif'
import logo from './assets/icon.png'
import forecastImg from './assets/forecast 2.png'
import detailsImg from './assets/details.png'
import windImg from './assets/wind 2.png'
import leafImg from './assets/leaf.png'
import leftArrow from './assets/left-arrow.png'

function App() {
  const [country, setCountry] = useState('')
  const [cities, setCitites] = useState([])
  const [currentCondition, setCurrentCondition] = useState(null)
  const [forecast, setForecast] = useState([])
  const [cityWeather, setCityWeather] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const latitude = pos.coords.latitude
      const longitude = pos.coords.longitude
      const country = feature([latitude, longitude]).properties.nameEn

      setCountry(country)

      countryService
        .getCities(country)
        .then(data => {
          setCitites(data.data.states)
        })
      
      weatherService
        .getWeather(country)
        .then(data => {
          setCurrentCondition(data.data.current_condition[0])
          setForecast(data.data.weather)
        })
    })
  }, [])

  const handleCitySelect = city => {
    weatherService
      .getWeather(city)
      .then(data => {
        setCityWeather(data.data)
      })
  }

  if (!currentCondition) {
    return (
      <div id="loading-container">
        <img src={logo} alt="Logo" id="logo" />
        <img src={loadingImg} alt="loading" id="spinner" />
      </div>
    )
  }

  if (cityWeather) {
    const cityName = cityWeather.request[0].query.split(',')[0]
    const monthly = cityWeather.ClimateAverages[0].month
    const cityCondition = cityWeather.current_condition[0]
    const cityForecast = cityWeather.weather

    const hours = cityForecast[0].hourly.map(h => {
      const hourString = h.time.toString().padStart(4,  '0')
      return `${hourString.slice(0, 2)}:${hourString.slice(2)}`
    })

    return (
      <>
        <header id="city">
          <div>
            <button id="back" onClick={() => setCityWeather(null)}>
              <img src={leftArrow} alt="" />
            </button>
            <h1>{cityName}</h1>
          </div>
          <section>
            <h1>{cityCondition.temp_C}<sup>&deg;C</sup></h1>
            <div>
              <p>{cityCondition.weatherDesc[0].value}
                <span>{cityForecast[0].maxtempC}<sup>&deg;</sup> / {cityForecast[0].mintempC}
                  <sup>&deg;</sup></span>
              </p>
            </div>
          </section>
        </header>

        <div className='charts'>
          <Chart xValues={monthly.map(m => m.name)}
            yValues={monthly.map(m => m.avgMinTemp)}
            xLabel={"Month"} yLabel={`Temperature`}
            caption={"Average Monthly Minimum Temperature"}
            type={'line'} />

          <Chart xValues={monthly.map(m => m.name)}
            yValues={monthly.map(m => m.absMaxTemp)}
            xLabel={"Month"} yLabel={`Temperature`}
            caption={"Absolute Monthly Maximum Temperature"}
            type={'line'} />

          <Chart xValues={hours}
            yValues={cityForecast[0].hourly.map(h => h.tempC)}
            xLabel={"Hour"} yLabel={`Temperature`}
            caption={"Hourly Temperature"}
            type={'bar'} />
        </div>
      </>
    )
  }

  return (
    <>
      <header>
        <SearchBar cities={cities} cityHandler={handleCitySelect} />
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
