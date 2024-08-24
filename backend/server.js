const express = require('express'); // express module import 
const bodyParser = require('body-parser');
const app = express(); // create instance of express application
const trackerRoute = require('./routes/tracker');
const connectDB = require('./config/db'); // imported database
const cors = require('cors'); // imported cors for policy to connect bend to fend.
app.use(cors()); // added cors

// connect to mongoose
connectDB();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Social Media time tracker API');
}); // route

// use the route defined in tracker.js commented the follcode to replace with this

app.use('/api',trackerRoute);


// app.post('/track',(req,res)=>{
//     const {platform , timespent} = req.body;
//     res.send(`time spent on ${platform} : ${timespent} minutes.`);  
// }); // example post route.

const port = 3000; // the port address for the local server

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`); // will start the server.
})