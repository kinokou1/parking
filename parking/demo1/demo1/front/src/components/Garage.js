import React, { useEffect, useState } from 'react';
import api from '../api';

const Garage = () => {
    const [garageData, setGarageData] = useState([]);
    const [totalNumber, setTotalNumber] = useState(0); // 总车位数
    const [remainNumber, setRemainNumber] = useState(0); // 剩余车位数
    const [currentPage, setCurrentPage] = useState(1); // 当前页
    const [itemsPerPage] = useState(20); // 每页显示 20 条数据

    useEffect(() => {
        fetchGarageData();
    }, []);

    const fetchGarageData = async () => {
        try {
            const data = await api.getGarageData();
            setGarageData(data);
            // 计算总车位数和剩余车位数
            const total = data.reduce((acc, item) => acc + item.total_number, 0);
            const remain = data.reduce((acc, item) => acc + item.remain_number, 0);

            setTotalNumber(total);
            setRemainNumber(remain);

            // 设置分页数据
            setGarageData(data);
        } catch (error) {
            console.error('获取车库数据失败:', error);
        }
    };

    // 计算当前页的数据
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = garageData.slice(indexOfFirstItem, indexOfLastItem);

    // 分页控制
    const totalPages = Math.ceil(garageData.length / itemsPerPage);

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

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>车库管理</h2>
            <p>总车位数: {totalNumber}，剩余车位数: {remainNumber}</p>
            <table>
                <thead>
                <tr>
                    <th>车位号</th>
                    <th>总车位数</th>
                    <th>剩余车位数</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((spot) => (
                    <tr key={spot.parkingspace_id}>
                        <td>{spot.parkingspace_id}</td>
                        <td>{spot.total_number}</td>
                        <td>{spot.remain_number}</td>
                    </tr>
                ))}
                </tbody>
            </table>
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

export default Garage;
