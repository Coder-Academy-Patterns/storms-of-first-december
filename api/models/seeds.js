const DayRecord = require('./DayRecord')
const { readDarkSkyForecast } = require('../services/darkSky')
const _ = require('lodash')

const melbourneCoords = '-37.8142,144.9632'
const sydneyCoords = '-33.8548,151.2165'

function createDayRecordFromDarkSkyForecast(forecast, city) {
  return DayRecord.create({
    city,
    rainfallMM: forecast.precipIntensity,
    day: new Date(forecast.time * 1000)
  })
}

Promise.all([].concat(
  // Melbourne November
  _.times(30, (n) => (
    readDarkSkyForecast(melbourneCoords, '2017', '11', n + 1, '+1100')
  )),
  // Melbourne December
  _.times(5, (n) => (
    readDarkSkyForecast(melbourneCoords, '2017', '12', n + 1, '+1100')
  ))
))
  .then((forecasts) => {
    console.log('forecasts', forecasts)
    return Promise.all(
      // Will return an array of Promises
      forecasts.map((forecast) => {
        // Will return a Promise for each created day record
        return createDayRecordFromDarkSkyForecast(forecast, 'Melbourne')
      })
    )
  })
  .then((docs) => {
    console.log('created', docs)
  })
  .catch((error) => {
    console.error('Error seeding', error)
  })

Promise.all([].concat(
  // Sydney November
  _.times(30, (n) => (
    readDarkSkyForecast(sydneyCoords, '2017', '11', n + 1, '+1100')
  )),
  // Sydney December
  _.times(5, (n) => (
    readDarkSkyForecast(sydneyCoords, '2017', '12', n + 1, '+1100')
  ))
))
  .then((forecasts) => {
    console.log('forecasts', forecasts)
    return Promise.all(
      // Will return an array of Promises
      forecasts.map((forecast) => {
        // Will return a Promise for each created day record
        return createDayRecordFromDarkSkyForecast(forecast, 'Sydney')
      })
    )
  })
  .then((docs) => {
    console.log('created', docs)
  })
  .catch((error) => {
    console.error('Error seeding', error)
  })
