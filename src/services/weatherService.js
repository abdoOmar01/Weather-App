import axios from 'axios'

const getWeather = async (country) => {
  const url = `${import.meta.env.VITE_WEATHER_API}` +
              `?key=${import.meta.env.VITE_API_KEY}` +
              `&q=${country}` +
              `&aqi=yes&num_of_days=5&format=json`

  const response = await axios.get(url)
  return response.data
}

export default { getWeather }