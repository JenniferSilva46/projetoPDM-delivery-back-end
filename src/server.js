require('dotenv').config();

const cors = require('cors');
const {json} = require('express');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;

app.use((req,
         res,
         next) => {
        res.header("Access-Control-Allow-Origin", "*");
        app.use(cors());
        next();
    }
);

// const users = require('./api/dataBase');
//
// app.post('/createuser', users.createUser);
// app.get('/users', users.getAllUsers);
// app.put('/updateuser', users.updateUser);
// app.delete('/deleteuser', users.deleteUser);


app.listen(port, () => console.log(port));