import dotenv from 'dotenv';
import express from 'express'
import registerRouter from './routes/register_routes.js';
import contactRouter from './routes/contact_routes.js';
import cors from 'cors';
import connectDB from './config/db_config.js';

dotenv.config();
const PORT =process.env.PORT ;
 

var app= express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/register',registerRouter)
app.use('/contact',contactRouter)
connectDB();


app.listen(PORT,()=>{})
