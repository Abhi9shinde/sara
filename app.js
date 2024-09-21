const express = require("express");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const path = require("path");



const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));



app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
  });

app.get('/',(req,res)=>{
    res.render('menu/index')
});

//SINGLE COLLECTION
app.get('/:num',(req,res)=>{
  const{num}=req.params;
    res.render(`single/single${num}`);
})


//MENU BUTTONS
app.get('/about',(req,res)=>{
  res.render('menu/about')
})
app.get('/index',(req,res)=>{
  res.render('menu/index')
})
app.get('/contact',(req,res)=>{
  res.render('menu/contact')
});
app.get('/bag',(req,res)=>{
  res.render('menu/bag')
})