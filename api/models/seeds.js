const axios = require('axios')
const DayRecord = require('./DayRecord')

const darkSkyAPIKey = '32d0988dc1e92701571405b0121b40ef'
const darkSkyAPI = axios.create({
  baseURL: `https://api.darksky.net/forecast/${darkSkyAPIKey}`
})

const melbourneCoords = '-37.8142,144.9632'

function readDarkSkyForecast(coords, year, month, day, timezoneOffset) {
  return darkSkyAPI.get(`/${coords},${year}-${month}-${day}T00:00:00${timezoneOffset}`, {
    params: {
      exclude: 'currently,flags,hourly',
      units: 'si'
    }
  })
    .then((res) => res.data.daily.data[0])
}

Promise.all([
  readDarkSkyForecast(melbourneCoords, '2017', '11', '01', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '02', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '03', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '04', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '05', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '06', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '07', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '08', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '09', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '10', '+1100'),

  readDarkSkyForecast(melbourneCoords, '2017', '11', '29', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '11', '30', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '12', '01', '+1100'),
  readDarkSkyForecast(melbourneCoords, '2017', '12', '02', '+1100'),
])
  .then((forecasts) => {
    console.log('forecasts', forecasts)
    return DayRecord.create(
      forecasts.map((forecast) => {
        return {
          precipType: forecast.precipType,
          precipIntensity: forecast.precipIntensity,
          city: 'Melbourne',
          day: new Date(forecast.time * 1000)
        }
      })
    )
  })
  .then((docs) => {
    console.log('created', docs)
  })
  .catch((error) => {
    console.error('Error seeding', error)
  })
