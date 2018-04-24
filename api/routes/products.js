 const express = require('express');
 const Product = require('../models/product');
 const mongoose = require('mongoose');
//   const app = express();

// now we set up router which is come from express to set routes
 const router = express.Router();
  

   // GET request product
 router.get('/', (req, res, next)=>{
       Product.find()
       .select('_id name price')
       .exec()
       .then(docs=>{

         const response = {
          count: docs.length, 
          product: docs.map(doc=>{
              return{
                name:doc.name, 
                price: doc.price,
                id: doc._id,
                request : {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + doc._id

                }
            }
              
          }
        )
         };

           if(docs.length >=0){
            res.status(200).json(response);
           }
           else{
               res.status(404).json({
                   message: 'database is empty'
               });
           }
       })
       .catch(err=>{
           console.log(err);
           res.status(500).json({
             error: err
           });
       });
 });
   

     //POST request for product
 router.post('/', (req, res, next) =>{
     
      const product = new Product({
          _id: mongoose.Types.ObjectId(),
          name: req.body.name,
          price: req.body.price
      });

    product.save()
    .then(result=>{
        console.log(result);
    
        res.status(200).json({
            message: 'Product Succesfully Created',
            createdProduct : {
                name:result.name,
                price: result.price,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result.id
                }
            }
        });
    }).
    catch(err=>{

        res.status(500).json({
            error:err
        });
    });
   
 });
   

    // GET pproduct by its id
   router.get('/:productID' , (req, res, next)=>{

     const id = req.params.productID;
     Product.findById(id).
     select('name price _id')
     .exec()
     .then( doc=>{
         console.log(doc);
         // if document is not null
         if(doc){
            res.status(200).json(doc);
         }
         else{
             res.status(404).json({
                 Error: 'invalid id'
             });
         }
       

     })
     .catch(err=>{
         console.log(err);
         res.status(400).json({
             error:err
         });
     });
   });
    

   // PATCH request for a product bu its product id
   router.patch('/:productID' , (req, res, next)=>{
    const id = req.params.productID;
     const updateOps = {};
     for(const ops of req.body){
         updateOps[ops.propName] = ops.value;
     }

     Product.update({_id:id} , {$set : updateOps})
     .exec()
     .then(result=>{
         res.status(200).json(result);
     })
     .catch(error=>{
         console.log(error);
     });
});



    // DELETE a product by its id
    router.delete('/:productID' , (req, res, next)=>{
        const id = req.params.productID;
          Product.remove({_id:id}).exec()
          .then((result)=>{
              res.status(200).json(result);
          })
          .catch(error=>{
              console.log(error);
          });
    });



 module.exports = router;