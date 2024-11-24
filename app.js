const express = require("express");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const path = require("path");


const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

//HOME PAGE
app.get('/',(req,res)=>{
    res.render('menu/index')
});

//MENU 
const menuRoutes=require("./routes/menu")
app.use("/",menuRoutes);

//SINGLE COLLECTION
const singleRoutes=require("./routes/single");
app.use('/single',singleRoutes);


app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});