const path=require('path')
const express = require('express');
const dotenv = require('dotenv');//to create gloabal varible
const colors = require('colors');//to add colors in console
const morgan = require('morgan');//to add colors in console
const connectDB=require('./config/db')
dotenv.config({path:'./config/config.env'})

connectDB();
const transactions=require('./routes/transaction')
const app = express();

app.use(express.json())

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.use('/api/v1/transactions',transactions);

if (process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const PORT= process.env.PORT || 8000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode on port${PORT}`.yellow.bold));

