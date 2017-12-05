const express = require('express')
const DayRecord = require('../models/DayRecord')

const router = new express.Router()

router.get('/day-records', (req, res) => {
  DayRecord.find()
    .then((records) => {
      res.json(records)
    })
    .catch((error) => {
      res.json({ error: error.message })
    })
})

router.get('/day-records/:cityName', (req, res) => {
  const { cityName } = req.params
  DayRecord.find({ city: cityName })
    .then((records) => {
      res.json(records)
    })
    .catch((error) => {
      res.json({ error: error.message })
    })
})

router.get('/day-records/:cityName/:year/:month', (req, res) => {
  const { cityName, year, month } = req.params
  DayRecord.find({
    city: cityName,
    day: {
      $gte: new Date(year, month, 1),
      $lt: new Date(year, month + 1, 1)
    }
  })
    .then((records) => {
      res.json(records)
    })
    .catch((error) => {
      res.json({ error: error.message })
    })
})

module.exports = router
