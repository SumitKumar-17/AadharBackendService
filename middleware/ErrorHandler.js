// Define error handling middleware
const express=require('express');
const app=express();
const bodyParser=require('body-parser');


const errorHandler = (err, req, res, next) => {
    // Check if the error is a JSON parsing error
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ message: "Invalid JSON format" });
    }
    
    // If the error is not a JSON parsing error, proceed to the next error handler
    next(err);
};

module.exports = errorHandler;
