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

//SINGLE MEN COLLECTION
app.get('/single1',(req,res)=>{
    res.render('single/single1');
})
app.get('/single2',(req,res)=>{
  res.render('single/single2');
})
app.get('/single3',(req,res)=>{
  res.render('single/single3');
})
app.get('/single4',(req,res)=>{
  res.render('single/single4');
})

//SINGLE WOMEN COLLECTION
app.get('/single5',(req,res)=>{
  res.render('single_women/single5');
})
app.get('/single6',(req,res)=>{
  res.render('single_women/single6');
})
app.get('/single7',(req,res)=>{
  res.render('single_women/single7');
})
app.get('/single8',(req,res)=>{
  res.render('single_women/single8');
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