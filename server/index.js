const express = require('express');
const app = express();
const routes = require('./routes/route');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



app.use(cors());
app.use(express.json());

const PORT =  4000;


// main route
app.use('/api', routes);

// connect database
 mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected');
 }).catch((err) => {
    console.log(err);
 });





app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
