const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.end('Hello from HomePage');
})

app.get('/about', (req, res) => {
    return res.end(`Hello ${req.query.name} from About Page`);
})

app.listen(3000, () => console.log('Server is listening on port 3000'));