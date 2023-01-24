const express = require('express');
const mongoose = require ("mongoose");
const app = express();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const skuRoutes = require('./routes/skuRoutes1');
const instaRoutes = require('./routes/instaRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const path = require("path");
const csvRoutes = require("./routes/csvRoutes");
const bodyParser = require('body-parser');


app.use(cors({
    origin:["http://localhost:3001","http://localhost:3000"],
}));


app.set('view engine', 'ejs');

const dbURI= 'mongodb+srv://sanchit:diehardfan@cluster0.lxmxcq5.mongodb.net/Footox?retryWrites=true&w=majority';
mongoose.connect (dbURI, { useNewUrlParser : true, useUnifiedTopology: true})
.then((result) => app.listen (4000))
.catch((err) => console . log(err));


// app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.use(express.static('public'));
app.use("/CSVFile", express.static(path.join(__dirname, "CSVFile")));

console.log("I am runing");


app.use(express.json());
app.use(authRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(skuRoutes);
app.use(instaRoutes);
app.use(csvRoutes);
app.use(cookieParser());