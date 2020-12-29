const express=require('express');
const router=express.Router();

const Item =require('../../models/Item');
router.get('/',(req,res)=>{
    Item.find()
       .sort({date:-1})
       .then((items)=>{res.send(items)})
})
router.post('/',(req,res)=>{
    const item=new Item(
        {
            name:req.body.name
        }
    )
    item.save().then((item)=>{res.send(item)})
})
router.delete('/:id',(req,res)=>{
    Item.findById(req.params.id)
    .then((item)=>{
       item.remove().then(()=>{res.send({success: true})})
    })
    .catch((err)=>{res.status(404).json({success: false})})
})

module.exports=router;