// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';
const api = {
    // 获取车库数据
    getGarageData: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/garage`);
        return response.data;
    },
    // 获取操作员
    getOperators: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/operators`);
        return response.data;
    },
    // 新增操作员
    addOperator: async (operatorData) => {
        const response = await axios.post(`${API_BASE_URL}/api/operators`, operatorData);
        return response.data;
    },
    // 删除操作员
    deleteOperator: async (operatorId) => {
        const response = await axios.delete(`/api/operators/${operatorId}`);
        return response.data;
    },
    // 获取停车卡
    getParkingCards: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/parking-cards`);
        return response.data;
    },
    // 新增停车卡
    addParkingCard: async (cardData) => {
        const response = await axios.post(`${API_BASE_URL}/api/parking-cards`, cardData);
        return response.data;
    },
     // 删除停车卡
    deleteParkingCard: async (cardId) => {
        const response = await axios.delete(`/api/parking-cards/${cardId}`);
        return response.data;
    },
    // 创建车辆入库记录
    createVehicleEntry: async (entryData) => {
        const response = await axios.post(`${API_BASE_URL}/api/vehicle-entry`, entryData);
        return response.data;
    },
    // 车辆出库及计算费用
    calculateFee: async (exitData) => {
        const response = await axios.post(`${API_BASE_URL}/api/vehicle-exit`, exitData);
        return response.data;
    },
    // 获取停车记录
    getParkingRecords: async () => {
        const response = await axios.get(`${API_BASE_URL}/api/parking-records`);
        return response.data;
    },
};

export default api;
