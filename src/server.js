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

    const user = require('./api/database/User');
    const pedido = require('./api/database/Orders');
    const product = require('./api/database/Product');
    const product_orders = require('./api/database/ProductOrders');
    const adress = require('./api/database/Adress');

    app.post('/user/insert', user.createUser);
    app.get('/userget/:id', user.getUser);
    app.put('/userupdate', user.updateUser);
    app.delete('/user/delete/:id', user.deleteUser);
    app.get('/users', user.getAllUsers);
    app.post('/user/login', user.auth);

    app.post('/order/insert', pedido.createOrdered);
    app.get('/getorders', pedido.getOrdered);

    app.get('/getproduct', product.getAllProducts);

    app.get('/productOrders/:id/:date', product_orders.getProductOrder);
    app.get('/orderDetails/:id/:pedido', product_orders.getOrderDetails);
    app.get('/orderBag/:id/', product_orders.getProductBag);


    app.post('/adress/insert', adress.createAdress);
    app.get('/adressGet/:id', adress.getAdress);
    app.put('/adressUpdate', adress.updateAdress);
    app.delete('/adress/delete/:id', adress.deleteAdress);


    app.listen(port, () => console.log(port));