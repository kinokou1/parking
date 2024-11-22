import React, { useState } from 'react';
import api from '../api';

const VehicleExit = () => {
    const [vehicle_no, setLicensePlate] = useState('');
    const [fee, setFee] = useState(null);

    const handleExit = async () => {
        if (!vehicle_no) {
            alert('请输入车牌号！');
            return;
        }
        const exitData = { vehicle_no: vehicle_no, timeout: new Date().toISOString() };
        const { cost } = await api.calculateFee(exitData);
        setFee(cost);
        alert(`车辆 ${vehicle_no} 停车费用为：${cost} 元`);
        setLicensePlate('');
    };

    return (
        <div className="container">
            <h2>车辆出库管理</h2>
            <div className="card">
                <h3>车辆出库</h3>
                <div>
                    <input
                        type="text"
                        placeholder="车牌号"
                        value={vehicle_no}
                        onChange={(e) => setLicensePlate(e.target.value)}
                    />
                    <button onClick={handleExit}>确认出库</button>
                </div>
                {fee !== null && (
                    <p>停车费用：<strong>{fee} 元</strong></p>
                )}
            </div>
        </div>
    );
};

export default VehicleExit;
