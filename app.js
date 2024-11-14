const express = require("express");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const path = require("path");
const productData=require('./public/product.json')


const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    res.render('menu/index')
});

//MENU BUTTONS
app.get('/about',(req,res)=>{
  res.render('menu/about')
});
app.get('/index',(req,res)=>{
  res.render('menu/index')
});
app.get('/contact',(req,res)=>{
  res.render('menu/contact')
});
app.get('/bag',(req,res)=>{
  res.render('menu/bag')
});
app.get('/login',(req,res)=>{
  res.render('menu/login')
});
app.get('/signup',(req,res)=>{
  res.render('menu/signup')
});
//SINGLE COLLECTION
app.get('/single/:num',(req,res)=>{
  const{num}=req.params;
  const prodId=parseInt(num,10);
  for(const cat in productData){
    product=productData[cat].find(item=>item.id===prodId);
    if(product) break;
  }

    res.render(`single/single`,{prodId,product});
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});