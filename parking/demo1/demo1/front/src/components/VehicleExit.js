// import React, { useState } from 'react';
// import api from '../api';
//
// const VehicleExit = () => {
//     const [vehicle_no, setLicensePlate] = useState('');
//     const [fee, setFee] = useState(null);
//     const [error, setError] = useState(null); // 新增错误状态
//
//     const handleExit = async () => {
//         if (!vehicle_no) {
//             alert('请输入车牌号！');
//             return;
//         }
//
//         try {
//             // 获取所有车辆数据
//             const vehicles = await api.getVehicle();
//             const exitData = { vehicle_no: vehicle_no, timeout: new Date().toISOString() };
//
//             // 查找对应的车辆
//             const vehicle = vehicles.find(v => v.vehicle_no === exitData.vehicle_no);
//             if (!vehicle) {
//                 setError('车辆信息未找到！');
//                 return;
//             }
//
//             const { timein, card_id } = vehicle; // 获取车辆的入库时间和卡号
//
//             if (!timein) {
//                 setError('车辆入库时间缺失！');
//                 return;
//             }
//
//             // 获取停车卡信息
//             const parkingCards = await api.getParkingCards();
//             const card = parkingCards.find(c => c.card_id === card_id); // 使用 vehicle 中的 card_id
//
//             if (!card) {
//                 alert('停车卡信息未找到！');
//                 return;
//             }
//
//             // 判断停车卡类型
//             if (card.card_type === '特种免费卡' || card.card_type === '月租卡') {
//                 setFee('0.00');
//                 alert(`车辆 ${vehicle_no} 使用 ${card.card_type}，停车费用为：0 元`);
//                 setError(null); // 清除错误信息
//                 setLicensePlate(''); // 清空车牌号
//                 return;
//             }
//
//             // 计算停车时长和费用
//             const entryTime = new Date(timein); // 入库时间
//             const exitTime = new Date(); // 当前时间，即出库时间
//             const parkedDuration = (exitTime - entryTime) / 1000 / 60 / 60; // 停车时长（小时）
//             const roundedHours = Math.ceil(parkedDuration); // 向上取整，计算实际收费的小时数
//
//             let cost = 0;
//             if (roundedHours > 0) {
//                 cost += 2; // 首小时收费 2 元
//             }
//             if (roundedHours > 1) {
//                 cost += (roundedHours - 1) * 1; // 后续每小时收费 1 元
//             }
//
//             setFee(cost.toFixed(2)); // 设置费用并保留两位小数
//             setError(null); // 清空错误信息
//
//             alert(`车辆 ${vehicle_no} 停车费用为：${cost.toFixed(2)} 元`);
//             // 插入出库记录到数据库
//             const recordNo = `${vehicle_no}-${new Date().getTime()}`; // 示例：生成一个唯一的记录号
//             const timeinDate = new Date(timein);
//             const timeoutDate = new Date(); // 当前时间作为出库时间
//             const timetotal = Math.ceil(parkedDuration * 60); // 停车时长的总分钟数
//
//             const recordData = {
//                 record_no: recordNo,
//                 timein: timeinDate,
//                 timeout: timeoutDate,
//                 timetotal: timetotal,
//                 cost: cost.toFixed(2),
//                 vehicle_no: vehicle_no
//             };
//
//             // 将出库记录插入到数据库
//
//             setLicensePlate(''); // 清空车牌号
//         } catch (error) {
//             console.error('出库操作失败:', error);
//             setError('系统发生错误，请稍后再试');
//         }
//     };
//
//     return (
//         <div className="container">
//             <h2>车辆出库管理</h2>
//             <div className="card">
//                 <h3>车辆出库</h3>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="车牌号"
//                         value={vehicle_no}
//                         onChange={(e) => setLicensePlate(e.target.value)}
//                     />
//                     <button onClick={handleExit}>确认出库</button>
//                 </div>
//                 {error && <p style={{ color: 'red' }}><strong>{error}</strong></p>} {/* 错误信息显示 */}
//                 {fee !== null && (
//                     <p>停车费用：<strong>{fee} 元</strong></p>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default VehicleExit;
import React, { useState } from 'react';
import api from '../api';

const VehicleExit = () => {
    const [vehicle_no, setLicensePlate] = useState('');
    const [fee, setFee] = useState(null);
    const [error, setError] = useState(null); // 新增错误状态

    const handleExit = async () => {
        if (!vehicle_no) {
            alert('请输入车牌号！');
            return;
        }

        try {
            // 获取所有车辆数据
            const vehicles = await api.getVehicle();
            const exitData = { vehicle_no: vehicle_no, timeout: new Date().toISOString() };

            // 查找对应的车辆
            const vehicle = vehicles.find(v => v.vehicle_no === exitData.vehicle_no);
            if (!vehicle) {
                setError('车辆信息未找到！');
                return;
            }

            const { timein, card_id } = vehicle; // 获取车辆的入库时间和卡号

            if (!timein) {
                setError('车辆入库时间缺失！');
                return;
            }

            // 获取停车卡信息
            const parkingCards = await api.getParkingCards();
            const card = parkingCards.find(c => c.card_id === card_id); // 使用 vehicle 中的 card_id

            if (!card) {
                alert('停车卡信息未找到！');
                return;
            }

            // 判断停车卡类型
            if (card.card_type === '特种免费卡' || card.card_type === '月租卡') {
                setFee('0.00');
                alert(`车辆 ${vehicle_no} 使用 ${card.card_type}，停车费用为：0 元`);
                setError(null); // 清除错误信息
                setLicensePlate(''); // 清空车牌号
                return;
            }

            // 计算停车时长和费用
            const entryTime = new Date(timein); // 入库时间
            const exitTime = new Date(); // 当前时间，即出库时间
            const parkedDurationMillis = exitTime - entryTime; // 停车时长（毫秒）

            // 计算小时数和分钟数
            const parkedDurationHours = Math.floor(parkedDurationMillis / 1000 / 60 / 60); // 小时数
            const parkedDurationMinutes = Math.floor((parkedDurationMillis / 1000 / 60) % 60); // 分钟数

            // 判断是否需要向上取整
            const roundedHours = parkedDurationMinutes > 0 ? parkedDurationHours + 1 : parkedDurationHours;

            let cost = 0;

            // 首小时费用：2元
            if (roundedHours > 0) {
                cost += 2; // 首小时收费 2 元
            }

            // 后续小时费用：每小时1元
            if (roundedHours > 1) {
                cost += (roundedHours - 1) * 1; // 每小时收费 1 元
            }

            setFee(cost.toFixed(2)); // 设置费用并保留两位小数
            setError(null); // 清空错误信息

            alert(`车辆 ${vehicle_no} 停车费用为：${cost.toFixed(2)} 元`);

            // 插入出库记录到数据库
            const recordNo = `${new Date().getTime()}`; // 示例：生成一个唯一的记录号

            const timetotal = Math.ceil(parkedDurationMillis / 1000 / 60); // 停车时长的总分钟数（以分钟为单位）

            const recordData = {
                record_no: recordNo,
                timein: entryTime,
                timeout: exitTime,
                timetotal: timetotal,
                cost: cost.toFixed(2),
                vehicle_no: vehicle_no
            };

            // 将出库记录插入到数据库
            await api.createParkingRecord(recordData);

            // 清空车牌号
            setLicensePlate('');

        } catch (error) {
            console.error('出库操作失败:', error);
            setError('系统发生错误，请稍后再试');
        }
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
                {error && <p style={{ color: 'red' }}><strong>{error}</strong></p>} {/* 错误信息显示 */}
                {fee !== null && (
                    <p>停车费用：<strong>{fee} 元</strong></p>
                )}
            </div>
        </div>
    );
};

export default VehicleExit;


