// src/api.js
import axios from 'axios';

const api = {
    // 获取车库数据
    getGarageData: async () => {
        const response = await axios.get(`/garage/findAll`);
        return response.data;
    },
    // 获取操作员
    getOperators: async () => {
        const response = await axios.get(`/operator/findAll`);
        return response.data;
    },
    // 新增操作员
    addOperator: async (operatorData) => {
        const response = await axios.post(`/operator/insert`, operatorData);
        return response.data;
    },
    // 删除操作员
    deleteOperator: async (operatorId) => {
        const response = await axios.delete(`/operator/delete`, { data: { id: operatorId } });
        return response.data;
    },
    // 修改操作员
    updateOperator: async (operatorData) => {
        const response = await axios.put(`/operator/update`,  operatorData);
        return response.data;
    },
    // 获取停车卡
    getParkingCards: async () => {
        const response = await axios.get(`/parkingcard/findAll`);
        return response.data;
    },
    // 新增停车卡
    addParkingCard: async (cardData) => {
        const response = await axios.post(`/parkingcard/insert`, cardData);
        return response.data;
    },
    // 删除停车卡
    deleteParkingCard: async (cardId) => {
        const response = await axios.delete(`/parkingcard/delete`, {
            data: { card_id: cardId }
        });
        return response.data;
    },
    // 修改停车卡
    updateParkingCard: async (cardData) => {
        const response = await axios.put(`/parkingcard/update`, cardData);
        return response.data;
    },
    // 获取内部的车
    getVehicle: async () => {
        const response = await axios.get(`/vehicle/findAll`);
        return response.data;
    },
    // 创建车辆入库记录
    createVehicleEntry: async (entryData) => {
        const response = await axios.post(`vehicle/insert`, entryData);
        return response.data;
    },
    // 获取停车记录
    getParkingRecords: async () => {
        const response = await axios.get(`/record/findAll`);
        return response.data;
    },
    createParkingRecord:async (recordData) => {
        const response = await axios.post(`/record/insert`,recordData);
        return response.data;
}
};

export default api;
