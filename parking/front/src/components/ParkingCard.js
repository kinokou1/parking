// src/components/ParkingCard.js
import React, { useState, useEffect } from 'react';
import api from '../api';

const ParkingCard = () => {
    const [cards, setCards] = useState([]);
    const [cardType, setCardType] = useState('临时卡');
    const [balance, setBalance] = useState(0);
    const [searchCardId, setSearchCardId] = useState(''); // 查询卡号

    useEffect(() => {
        fetchParkingCards();
    }, []);

    // 获取所有停车卡
    const fetchParkingCards = async () => {
        const data = await api.getParkingCards();
        setCards(data);
    };

    // 添加停车卡
    const addParkingCard = async () => {
        const newCard = { card_id: cards.length + 1, card_type: cardType, balance: balance };
        await api.addParkingCard(newCard);
        fetchParkingCards();
    };

    // 根据卡号查询停车卡
    const searchParkingCard = () => {
        if (searchCardId) {
            const filtered = cards.filter((card) => card.card_id.toString().includes(searchCardId));
            setCards(filtered);
        } else {
            fetchParkingCards(); // 查询为空时恢复列表
        }
    };

    // 根据卡号删除停车卡
    const deleteParkingCard = async (cardId) => {
        await api.deleteParkingCard(cardId);
        fetchParkingCards();
    };

    return (
        <div>
            <h2>停车卡管理</h2>

            {/* 添加停车卡 */}
            <div>
                <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                    <option value="临时卡">临时卡</option>
                    <option value="月租卡">月租卡</option>
                    <option value="储值卡">储值卡</option>
                    <option value="特种免费卡">特种免费卡</option>
                </select>
                <input
                    type="number"
                    placeholder="余额"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    min="0"
                />
                <button onClick={addParkingCard}>添加停车卡</button>
            </div>

            {/* 查询停车卡 */}
            <div>
                <input
                    type="text"
                    placeholder="输入卡号查询"
                    value={searchCardId}
                    onChange={(e) => setSearchCardId(e.target.value)}
                />
                <button onClick={searchParkingCard}>查询</button>
                <button onClick={fetchParkingCards}>重置</button>
            </div>

            {/* 显示停车卡列表 */}
            <ul>
                {cards.map((card) => (
                    <li key={card.card_id}>
                        卡号：{card.card_id}，类型：{card.card_type}，余额：{card.balance}元
                        <button
                            className="delete-btn"
                            onClick={() => deleteParkingCard(card.card_id)}
                        >
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkingCard;
