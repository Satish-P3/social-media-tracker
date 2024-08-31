import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AddTrackingForm from './AddTrackingForm';

const Dashboard = () => {
    const [trackingData, setTrackingData] = useState([]);
    const [formData, setFormData] = useState({
        platform: '',
        timeSpent: '',
        date: ''
    });


    useEffect(() => {
        fetchData();
    }, []);

    // function to fetch data from the backend.
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/track');
            setTrackingData(response.data);// update state with fetched data
        } catch (error) {
            console.error('Error Fetching data ', error);
        }
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send form data to the backend
            const response = await axios.post('http://localhost:3000/api/track', {
                platform: formData.platform,
                timeSpent: formData.timeSpent,
                date: new Date(formData.date).toISOString(),
            });

            console.log('Response:', response);
            console.log('Form submitted');
            // Fetch updated tracking data from the backend
            fetchData();

            // Clear form fields
            setFormData({ platform: '', timeSpent: '', date: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const deleteData = async(id) => {
        try{
            await axios.delete(`http://localhost:3000/api/track/${id}`);
            fetchData(); //refresh the data after deletion.
        }catch(error){
            console.error('Error deleting data.',error);
        }
    };

    // const addTrackingData = (newData) => {
    //     setTrackingData([...trackingData, newData]);
    // };

    return (
        <div>
            <h1>Social-Media-Dashboard</h1>
            {/* <AddTrackingForm onAdd={addTrackingData} /> */}
            <ul>
                {trackingData.map((entry, index) => (
                    <li key={index}>
                        Platform : {entry.platform} | TimeSpent : {entry.timeSpent} minutes | Date : {new Date(entry.date).toLocaleDateString()}
                        <button onClick={()=>deleteData(entry._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Platform"
                />
                <input
                    type="number"
                    value={formData.timeSpent}
                    onChange={(e) => setFormData({ ...formData, timeSpent: e.target.value })}
                    placeholder="Time Spent"
                />
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="Date"
                />
                <button type="submit">Add Tracking Data</button>
            </form>
        </div>
    );
}

export default Dashboard;