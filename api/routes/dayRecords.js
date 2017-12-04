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

module.exports = router
