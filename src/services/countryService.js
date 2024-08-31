import axios from 'axios'

const getCities = async (country) => {
  const response = await axios.post(`${import.meta.env.VITE_CITIES_API}`, { country })
  return response.data
}

export default { getCities }