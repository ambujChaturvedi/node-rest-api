 const express = require('express');

 const router = express.Router();


   // GET ORDERS
    router.get('/' , (req, res, next) =>{
     res.status(200).json({
         message: 'orders were fetched'
     });
    });

    //post orders
    router.post('/', (req , res , next)=>{
        const order = {
          name: req.body.name,
          price: req.body.price,
          quantity: req.body.quantity
        };

         res.status(200).json({ 
             message: 'order placed sucessfull' ,
             OrderDetail: order
         });
    });
  
    //get a order by id

     router.get('/:orderId' , (req ,res, next)=>{
           const orderID = req.params.orderId;
                  res.status(200).json({
                     message: 'got the order',
                     id: orderID
                  });
     });

     //patch a order

     router.patch('/:orderId' , (req ,res, next)=>{
        const orderID = req.params.orderId;
               res.status(200).json({
                  message: 'patched the order',
                  id: orderID
               });
  }); 

  //delete a order

  
  router.delete('/:orderId' , (req ,res, next)=>{
    const orderID = req.params.orderId;
           res.status(200).json({
              message: 'deleted the order',
              id: orderID
           });
});



 module.exports = router;