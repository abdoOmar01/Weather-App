import axios from 'axios'

const getFormattedDate = (date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getWeather = async (country) => {
  const url = `${import.meta.env.VITE_WEATHER_API}` +
              `?key=${import.meta.env.VITE_API_KEY}` +
              `&q=${country}` +
              `&aqi=yes&num_of_days=5&format=json`

  const response = await axios.get(url)
  return response.data
}

const getHistory = async (country) => {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)

  const url = `${import.meta.env.VITE_HISTORY_API}` +
              `?key=${import.meta.env.VITE_API_KEY}` +
              `&q=${country}` +
              `&date=${getFormattedDate(d)}&enddate=${getFormattedDate(new Date())}` +
              `&format=json`

  const response = await axios.get(url)
  return response.data
}

export default { getWeather, getHistory }