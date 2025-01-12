import express from 'express';

const app = express();
const port = 8082 || process.env.PORT;


//simple error handler
app.use((req, res, next) => {
    const someError = true;
    
    //if error crate error object
   /*  if (someError) {
        const error = new Error('Resource not found');
        error.status = 404;
        next(error); //pass error to error handler middleware
    } else {
        next();
    } */

    //modelling with try catch block for synchronous error handling
    try {
        if (someError) {
            throw new Error('Resource not found');
        } else {
            next();
        }
    } catch (error) {
        error.status = 404;
        next(error); //pass error to error handler middleware
    }
});


app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});


//error handler middleware below regular routes
//takes 4 arguments
app.use((error, req, res, next) => {
    //logging stack trace i.e where the error occured in the code
    //console.error(error.stack);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        },
        //stack: error.stack
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})