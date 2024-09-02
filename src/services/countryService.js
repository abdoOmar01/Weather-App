import axios from 'axios'

const citiesAPI = import.meta.env.VITE_CITIES_API
const apiKey = import.meta.env.VITE_CITIES_API_KEY

const getCities = async (code) => {
  const response =
    await axios
      .get(`${citiesAPI}/${code}/states`, {
        headers: {
          "X-CSCAPI-KEY": apiKey,
        }
      })

  return response.data
}

export default { getCities }