const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true);

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Has Been Connected')
})

//tell server to use file we created
const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// app.get('',(req,res)=> {
    // res.send("<h1>This is my first Express App</h1>");
// })

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})