const express = require("express");
const router = express.Router();
const productData=require('../public/product.json') //JSON FILE TO OPEN SINGLE

router.get('/:num',(req,res)=>{
    const{num}=req.params;
    const prodId=parseInt(num,10);
    for(const cat in productData){
      product=productData[cat].find(item=>item.id===prodId);
      if(product) break;
    }
  
      res.render(`single/single`,{prodId,product});
  });

module.exports=router;