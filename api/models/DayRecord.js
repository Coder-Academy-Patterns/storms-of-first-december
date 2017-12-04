const mongoose = require('./init')

const DayRecord = mongoose.model('Forecast', {
  city: String,
  day: Date,
  precipType: String,
  precipIntensity: { type: Number, default: 0 }
})

DayRecord.schema.index({ city: 1, day: 1 }, { unique: true })

module.exports = DayRecord
