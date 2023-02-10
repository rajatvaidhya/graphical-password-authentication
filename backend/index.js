const connectToMongo = require('./db');
const express = require('express');
const app = express();
var cors = require('cors');
const port = 5000;
connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(port, ()=> {
    console.log(`Running at port http://localhost:${port}`);
})