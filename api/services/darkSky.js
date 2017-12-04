const axios = require('axios')

const darkSkyAPIKey = '32d0988dc1e92701571405b0121b40ef'
const darkSkyAPI = axios.create({
  baseURL: `https://api.darksky.net/forecast/${darkSkyAPIKey}`
})

function readDarkSkyForecast(coords, year, month, day, timezoneOffset) {
  return darkSkyAPI.get(`/${coords},${year}-${month}-${day}T00:00:00${timezoneOffset}`, {
    params: {
      exclude: 'currently,flags,hourly',
      units: 'si'
    }
  })
    .then((res) => res.data.daily.data[0])
}

module.exports = {
  readDarkSkyForecast
}