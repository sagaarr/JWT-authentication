const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser');
// import route
const authRoute = require('./routes/auth');
const allUser = require('./routes/privateRoute');
dotenv.config();
// mongodb database
mongoose.connect(process.env.DB_CONNECT ,{ useNewUrlParser: true }, ()=> { console.log("Connected to mongoose")})
/* middleWare  */
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(express.json());



app.use('/api/user', authRoute);
app.use('/api/posts', allUser);

app.listen('3000', ()=>{console.log("Started at port 3000")});