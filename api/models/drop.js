const DayRecord = require('./DayRecord')

DayRecord.deleteMany()
  .then(() => {
    console.log('Deleted day records')
  })
