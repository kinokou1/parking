import React, { useState } from 'react';
import api from '../api';

const VehicleEntry = () => {
    const [vehicle_no, setLicensePlate] = useState('');
    const [card_id, setCardId] = useState('');

    const handleEntry = async () => {
        if (!vehicle_no || !card_id) {
            alert('请输入车牌号和停车卡号！');
            return;
        }
        const entryData = {
            vehicle_no: vehicle_no,
            card_id: card_id,
            timein: new Date().toISOString(),
        };
        await api.createVehicleEntry(entryData);
        alert(`车辆 ${vehicle_no} 已使用停车卡 ${card_id} 入库`);
        setLicensePlate('');
        setCardId('');
    };

    return (
        <div className="container">
            <h2>车辆入库管理</h2>
            <div className="card">
                <h3>车辆入库</h3>
                <div>
                    <input
                        type="text"
                        placeholder="车牌号"
                        value={vehicle_no}
                        onChange={(e) => setLicensePlate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="停车卡号"
                        value={card_id}
                        onChange={(e) => setCardId(e.target.value)}
                    />
                    <button onClick={handleEntry}>确认入库</button>
                </div>
            </div>
        </div>
    );
};

export default VehicleEntry;
