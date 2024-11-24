const express = require("express");
const router = express.Router();

router.get('/about',(req,res)=>{
    res.render('menu/about')
  });
router.get('/index',(req,res)=>{
    res.render('menu/index')
  });
router.get('/contact',(req,res)=>{
    res.render('menu/contact')
  });
router.get('/bag',(req,res)=>{
    res.render('menu/bag')
  });
router.get('/login',(req,res)=>{
    res.render('menu/login')
  });
router.get('/signup',(req,res)=>{
    res.render('menu/signup')
  });

module.exports=router;