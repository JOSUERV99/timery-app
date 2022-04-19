const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();

// database
const dbConnection = require("./database/db");

const app = express();

// middlewares 
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}))

// routes
const timerRouter = require("./routes/timer");
app.use('/api/v1/timers', timerRouter);

// constants
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}...`);
})


