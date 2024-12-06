import React, { useEffect, useState } from 'react';
import api from '../api';

const ParkingRecords = () => {
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 当前页
    const [itemsPerPage] = useState(20); // 每页显示条数

    useEffect(() => {
        fetchParkingRecords();
    }, []);

    const fetchParkingRecords = async () => {
        try {
            const data = await api.getParkingRecords();
            setRecords(data);
        } catch (error) {
            console.error("获取停车记录失败:", error);
        }
    };

    // 计算当前页数据
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = records.slice(indexOfFirstItem, indexOfLastItem); // 当前页数据
    const totalPages = Math.ceil(records.length / itemsPerPage); // 总页数

    // 分页控制函数
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h2>停车记录</h2>
            <p>总记录条数：{records.length}</p>
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
                    {currentData.map((record) => (
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

            {/* 分页按钮 */}
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    上一页
                </button>
                <span>
                    第 {currentPage} 页 / 共 {totalPages} 页
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    下一页
                </button>
            </div>
        </div>
    );
};

export default ParkingRecords;

