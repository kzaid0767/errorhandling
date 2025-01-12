import express from 'express';

const app = express();
const port = 8082 || process.env.PORT;


//simple error handler
app.use((req, res, next) => {
    const someError = true;
    
    //if error crate error object
    if (someError) {
        const error = new Error('Something else went wrong');
        error.status = 500;
        next(error); //pass error to error handler middleware
    } else {
        next();
    }
});


app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});


//error handler middleware below regular routes
//takes 4 arguments
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})