import axios from 'axios'

const getData = () => {
  return axios.get('/api/v0.1/data').then(({ data }) => data)
}

export default {
  getData
}
