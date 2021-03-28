const express = require('express');
const bodyParser= require('body-parser');
const mongojs= require('mongojs');
const db= mongojs('catalog',['products']);




const port=3000;
const app=express();

app.use(bodyParser.json());

app.get('/',function(req,res,next){
  res.send("Please use /api/products");
});

//Fetch all products
app.get('/api/products',function(req,res,next){
  db.products.find(function(err, docs){
    if(err){
      res.send(err);
    }
    else{
      console.log('Products found');
      res.json(docs);

    }
  })
});


//Fetch single product
app.get('/api/products/:id',function(req,res,next){
  db.products.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, doc){
    if(err){
      res.send(err);
    }
    else{
      console.log('Product found');
      res.json(doc);

    }
  })
});


//Add product
app.post('/api/products',function(req,res,next){
  db.products.insert(req.body,function(err,doc){
    if(err){
      res.send(err);
    }
      console.log("Adding Product");
      res.json(doc);
  })
});



//Update product
app.put('/api/products/:id',function(req,res,next){
  db.products.findAndModify({query: {_id: mongojs.ObjectId(req.params.id)},update:{
    $set: {
      name:  req.body.name,
      category: req.body.category,
      details: req.body.details
    }
  },
    new:true},function(err,doc){
      if(err){
        res.send(err);
      }
      console.log("Updating Product");
      res.json(doc);
    })
});


//Delete products
app.delete('/api/products/:id',function(req,res,next){
  db.products.remove({_id: mongojs.ObjectId(req.params.id)},function(err,doc){
    if(err){
      res.send(err);
    }
    console.log("Removing Product");
    res.json(doc);
  })
});

app.listen(port,function(){
  console.log("Port is running on port "+port);
});
