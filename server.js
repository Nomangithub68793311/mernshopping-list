const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path')
// const db =require('./config/Keys')
const items =require('./routes/api/item');

const app = express();

app.use(bodyParser.json());

// const db = 'mongodb+srv://newdatabaseuser:newdatabaseuser@cluster0.xr8ed.mongodb.net/database1?retryWrites=true&w=majority'
const db =require('./config/Keys')

mongoose.connect(db,{ useUnifiedTopology: true, useNewUrlParser: true})
  .then(()=>{console.log('mongo connected...')})
  .catch((err)=>{console.log(err)})


app.use('/api',items);  
if(process.env.NODE_ENV==='production'){
  app.use(expree.static('client/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })

}

const port=process.env.PORT || 5000;
app.listen(port,()=>{console.log(`server run at ${port}`)})
