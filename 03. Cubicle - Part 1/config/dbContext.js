  const mongoose = require('mongoose');
  const config = require('./config');

  module.exports = (dbConnectionString) => {
  return mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((data) => {
    console.log('Connected to database successfully!');
    return data;
  });
}
