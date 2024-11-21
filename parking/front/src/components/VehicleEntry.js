// src/components/VehicleEntry.js
import React, { useState } from 'react';
import api from '../api';

const VehicleEntry = () => {
    const [vehicle_no, setLicensePlate] = useState('');
    const [card_id, setCardId] = useState('');
    const [id, setOperatorId] = useState('');

    const handleEntry = async () => {
        const entryData = {
            vehicle_no: vehicle_no,
            card_id: card_id,
            timein: new Date().toISOString(),
        };
        await api.createVehicleEntry(entryData);
        alert(`车辆 ${vehicle_no} 已使用停车卡 ${card_id} 入库`);
    };

    return (
        <div>
            <h2>车辆入库管理</h2>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    车牌号：
                    <input
                        type="text"
                        value={vehicle_no}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    停车卡号：
                    <input
                        type="text"
                        value={card_id}
                        onChange={(e) => setCardId(e.target.value)}
                        style={{ marginLeft: '10px' }}
                    />
                </label>
            </div>
            <button onClick={handleEntry}>确认入库</button>
        </div>
    );
    
};

export default VehicleEntry;
