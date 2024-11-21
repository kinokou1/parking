// src/components/VehicleExit.js
import React, { useState } from 'react';
import api from '../api';

const VehicleExit = () => {
    const [vehicle_no, setLicensePlate] = useState('');
    const [cost, setFee] = useState(0);

    const handleExit = async () => {
        const exitData = { vehicle_no: vehicle_no, timeout: new Date().toISOString() };
        const { cost } = await api.calculateFee(exitData);
        setFee(cost);
        alert(`停车费用为：${cost}元`);
    };

    return (
        <div>
            <h2>车辆出库管理</h2>
            <input type="text" placeholder="出库车牌号" value={vehicle_no} onChange={(e) => setLicensePlate(e.target.value)} />
            <button onClick={handleExit}>计算费用并出库</button>
            {cost > 0 && <p>停车费用：{cost}元</p>}
        </div>
    );
};

export default VehicleExit;
