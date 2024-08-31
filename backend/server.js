const express = require('express'); // express module import 
const bodyParser = require('body-parser');
const app = express(); // create instance of express application
const trackerRoute = require('./routes/tracker');
const connectDB = require('./config/db'); // imported database
const cors = require('cors'); // imported cors for policy to connect bend to fend.
app.use(cors()); // added cors
const TrackingData = require('./models/Tracking'); // 25/08 Tracking data not found error Dashboard.

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

app.delete('/api/track/:id',async(req,res) =>{
    try{
        const id = req.params.id;
        await TrackingData.findByIdAndDelete(id);
        res.status(200).json({message:'Tracking data deleted successfuly.'});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Error deleting tracking data'});
    }
})

const port = 3000; // the port address for the local server

app.listen(port , ()=>{
    console.log(`server is running on port ${port}`); // will start the server.
})