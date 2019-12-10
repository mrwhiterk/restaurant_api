const mongoose = require('mongoose')


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log(`db connected to ${result.connections[0].name}`)
  })
  .catch(err => {
    // throw new Error(err)
    console.log(err)
  })
