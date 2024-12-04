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
                // 获取所有车辆数据
                const vehicles = await api.getVehicle();
                const exitData = { vehicle_no: vehicle_no, timeout: new Date().toISOString() };
        
                // 查找对应的车辆
                const vehicle = vehicles.find(v => v.vehicle_no === vehicle_no);
        
                if (!vehicle) {
                    setError('车辆信息未找到！');
                    return;
                }
        
                const { timein } = vehicle;
        
                if (!timein) {
                    setError('车辆入库时间缺失！');
                    return;
                }
        
                // 计算停车时长和费用
                const entryTime = new Date(timein); // 入库时间
                const exitTime = new Date(); // 当前时间，即出库时间
                const parkedDuration = (exitTime - entryTime) / 1000 / 60 / 60; // 停车时长（小时）
                // 向上取整，计算实际收费的小时数
                const roundedHours = Math.ceil(parkedDuration); // 向上取整

                let cost = 0;

                // 首小时费用：2元
                if (roundedHours > 0) {
                    cost += 2;
                }

                // 后续小时费用：每小时1元
                if (roundedHours > 1) {
                    cost += (roundedHours - 1) * 1;
                }

                setFee(cost.toFixed(2)); // 设置费用并保留两位小数
                setError(null); // 清空错误信息
                alert(`车辆 ${vehicle_no} 停车费用为：${cost.toFixed(2)} 元`);

        setFee(cost.toFixed(2));
        setLicensePlate(vehicle_no);
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
