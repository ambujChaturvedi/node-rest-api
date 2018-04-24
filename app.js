    const express = require('express');
    const app = express();
    const productRoute = require('./api/routes/products');
    const orderRoute = require('./api/routes/orders');
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');

    // middleware to use morgan for logging
    app.use(morgan('dev'));

        // middle-ware to use body-parser to parse request body efficently

    app.use(bodyParser.urlencoded({extended: false }));
    app.use(bodyParser.json());

    
       //connecting to mongoose
       //password admin ambujkumar22
       mongoose.connect('mongodb://ambuj_kumar22:ambujkumar22@node-restful-api-shard-00-00-rgfcv.mongodb.net:27017,node-restful-api-shard-00-01-rgfcv.mongodb.net:27017,node-restful-api-shard-00-02-rgfcv.mongodb.net:27017/test?ssl=true&replicaSet=node-restful-api-shard-0&authSource=admin');








        //sending header to handle CORS Error

        app.use((req, res, next)=>{
            res.header("Access-Control-Allow-Origin" , "*");
            res.header(
                "Access-Control-Allow-Headers" ,
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );
                    if(req.method === 'OPTIONS'){
                        res.header('Access-Control-Allow-Methods' , 'PUT, POST, PATCH, DELETE, GET');
                        return res.status(200).json({});
                    }
                    next();
        });


    // it is a middleware we can set for our routes for handling json
    app.use('/products', productRoute);
    app.use('/orders', orderRoute);
    

    // if our code make it upto here that means it is not handled by any routes
    // so we use eeror handling to 
    app.use((req,res,next)=>{
        const eeror = new Error('Not Found');
        eeror.status = 404;
        next(eeror);
        
    });

    // erorr due to database

    app.use((error,req, res, next)=>{
        res.status(error.status || 500).json({
            message: 'error might be due to database ',
            erorr: error.message
        });
    });

    module.exports = app;