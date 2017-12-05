const axios = require('axios')
const _ = require('lodash')

const darkSkyAPIKey = '32d0988dc1e92701571405b0121b40ef'
const darkSkyAPI = axios.create({
  baseURL: `https://api.darksky.net/forecast/${darkSkyAPIKey}`
})

function readDarkSkyForecast(coords, year, month, day, timezoneOffset) {
  month = _.padStart(month, 2, '0') // 9 => 09, 12 => 12
  day = _.padStart(day, 2, '0') // 3 => 03, 12 => 12
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