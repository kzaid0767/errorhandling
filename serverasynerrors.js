import express from 'express';

const app = express();
const port = 8082 || process.env.PORT;


//making fetch request
app.get('/posts', async (req, res, next) => {
    try {
        const response = await fetch('https://jsonplaceholder.typihjcode.com/posts');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        next(error);
    }
})


app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});


//error handler middleware below regular routes
//takes 4 arguments
app.use((error, req, res, next) => {
    //logging stack trace i.e where the error occured in the code
    console.log(error);
    //res.status(error.status || 500);
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