// src/components/ParkingRecords.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const ParkingRecords = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        fetchParkingRecords();
    }, []);

    const fetchParkingRecords = async () => {
        const data = await api.getParkingRecords();
        setRecords(data);
    };

    return (
        <div>
            <h2>停车记录</h2>
            <table>
                <thead>
                    <tr>
                        <th>订单编号</th>
                        <th>车牌号</th>
                        <th>入库时间</th>
                        <th>出库时间</th>
                        <th>停车时长</th>
                        <th>费用</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.record_no}>
                            <td>{record.record_no}</td>
                            <td>{record.vehicle_no}</td>
                            <td>{record.timein}</td>
                            <td>{record.timeout || '未出库'}</td>
                            <td>{record.timetotal || '待计费'}</td>
                            <td>{record.cost || '待结帐'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParkingRecords;
