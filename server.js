require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const AadharRoutes = require("./routes/aadharRoutes")
const ErrorHandler = require("./middleware/ErrorHandler")


const app = express();
const db_uri = process.env.MONGO_URI;

const port = process.env.PORT || 4000;


app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors());
app.use(bodyParser.json());


app.use('/aadhar', AadharRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.use(ErrorHandler);

app.get("/", (req, res) => {
    res.send(
        "Welcome to the server of Aadhar Backend"
    )
})

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Enter Correct JSON format' });
});

//making the database connection
mongoose.connect(db_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(5000, "0.0.0.0");
        console.log("Connected to the database on PORT 5000");
    })
    .catch((err) => {
        console.log(err);
    })
