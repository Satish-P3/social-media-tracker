const express = require('express');
const router = express.Router();
const Tracking = require('../models/Tracking');

// example route to track time spend on social media.
router.post('/track',async (req,res)=>{
    const {platform , timeSpent} = req.body;
    //res.send(`time spend on ${platform} : ${timeSpent} minutes.`); //before DB
    console.log("recieved data : ",req.body);
    try{
        const newTracking = new Tracking({platform , timeSpent});
        await newTracking.save();
        res.send(`time spend on ${platform} : ${timeSpent} minutes.`);
    }catch(err){
        res.status(500).send('Failed to track time.     ')
    }
});

router.get('/track', async (req,res)=>{
    const {platform , startDate , endDate} = req.query;
    const query = {};

    if(platform){
        query.platform = platform;
    }
    if(startDate && endDate){
        query.date = {$gte : new Date(startDate) , $lte : new Date(endDate)};
    }

    try{
        const trackingData = await Tracking.find(query);
        // const formattedData = trackingData.map(entry =>({
        //     platform : entry.platform,
        //     timeSpent: entry.timeSpent,
        //     date     : entry.date
        // }));
        res.json(trackingData);
    }catch(err){
        console.log("Failed to load data : ",err.message);
        res.status(500).json({error:'failed to load data.'});
    }
});

// export router to used in server.js

module.exports = router;