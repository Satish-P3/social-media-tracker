// src/components/AddTrackingForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddTrackingForm = ({ onAdd }) => {
    const [platform, setPlatform] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted'); // Debugging log

        const trackingData = { platform, timeSpent, date };
        console.log('Tracking data:', trackingData);// debugging log

        try {
            const response = await axios.post('http://localhost:3000/api/track', trackingData);
            console.log('Response:', response); // Debugging log
            onAdd(response.data);
            setPlatform('');
            setTimeSpent('');
            setDate('');
        } catch (error) {
            console.error('error adding tracking data.', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Platform : </label>
                <input 
                    type = "text"
                    // id='platform' // id
                    // name='platform' // name
                    value={platform}
                    onChange={(e)=>setPlatform(e.target.value)}
                    required
                />
            </div>
            <div>
                <label >Time Spent (minutes):</label>
                <input
                    type="number"
                    // id='timeSpent'
                    // name='timeSpent'
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    // id='date'
                    // name='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Tracking Data</button>
        </form>
    );
};

export default AddTrackingForm;