    require('dotenv').config();
    const cors = require('cors');
    const morgan =require('morgan')
    const express = require('express');
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(morgan('combined'))
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ type: 'application/vnd.api+json' }));
    const port = 3000;

    app.use((req,
             res,
             next) => {
            res.header("Access-Control-Allow-Origin", "*");
            app.use(cors());
            next();
        }
    );

    const user = require('./api/database/User')

    app.post('/user/insert', user.createUser);
    app.get('/userget/:id', user.getUser);
    app.put('/userupdate', user.updateUser);
    app.delete('/user/delete', user.deleteUser);
    app.get('/users', user.getAllUsers);


    app.listen(port, () => console.log(port));