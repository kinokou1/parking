// src/components/Garage.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const Garage = () => {
    const [garageData, setGarageData] = useState([]);

    useEffect(() => {
        fetchGarageData();
    }, []);

    const fetchGarageData = async () => {
        const data = await api.getGarageData();
        setGarageData(data);
    };

    return (
        <div>
            <h2>车库管理</h2>
            <p>总车位数: {garageData.total_number}, 剩余车位数: {garageData.remain_number}</p>
            <ul>
                {garageData.spots?.map((spot) => (
                    <li key={spot.parkingspace_id}>
                        车位号: {spot.parkingspace_id} - {spot.isOccupied ? '占用' : '空闲'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Garage;
