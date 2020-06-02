import * as express from 'express';

const port = 3333;

const app = express();
app.get('/users', (request, response) => {
    response.json(['Gustavo', 'Michelle', 'Duda', 'Davi']);
});

console.log(`Running on the port ${port}`);
app.listen(port);