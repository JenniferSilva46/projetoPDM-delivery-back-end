require('dotenv').config();
const {Client} = require('pg');

const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
});

client.connect()
    .then(()=> console.log('Conectado!'))
    .catch(err => console.log(err.stack));

module.exports= client