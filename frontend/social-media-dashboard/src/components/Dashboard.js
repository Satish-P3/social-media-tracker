import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [trackingData, setTrackingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/track');
                setTrackingData(response.data);
            } catch (error) {
                console.error("Error fetching data ", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            <h1>Social-Media-Dashboard</h1>
            <ul>
                {trackingData.map((entry,index) => (
                    <li key = {index}>
                        Platform : {entry.platform} | TimeSpent : {entry.timeSpent} minutes | Date : {new Date(entry.date).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard ;