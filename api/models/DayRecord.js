const mongoose = require('./init')

const DayRecord = mongoose.model('Forecast', {
  city: String,
  day: Date,
  precipType: String,
  precipIntensity: Number
})

DayRecord.schema.index({ city: 1, day: 1 })

module.exports = DayRecord
