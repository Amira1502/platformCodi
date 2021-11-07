// require express
const express = require('express')

// instance of express methods
const app = express()

// require and configure dotenv
require('dotenv').config()

// require connectio DB
const connectDB = require('./config/connectDB')
connectDB()

// cookie parse
const cookieParser = require('cookie-parser')
app.use(cookieParser())


// Middleware bodyparser (express json)
app.use(express.json())


// Dev Logginf Middleware
const cors = require('cors')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Routes
//app.use('/user', require('./routes/user'))
app.use('/api', require('./routes/auth'))
app.use('/api/project', require('./routes/project'))
app.use('/api/profile', require('./routes/profile'))



app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

// create server
const PORT = process.env.PORT
app.listen(PORT, error => error ? console.error(`can not connect to server : ${error}`)
    : console.log(`Server is running on http://localhost:${PORT} ....`)
)