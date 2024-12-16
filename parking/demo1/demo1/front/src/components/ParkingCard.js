import React, { useState, useEffect } from 'react';
import api from '../api';

const ParkingCard = () => {
    const [cards, setCards] = useState([]);
    const [cardType, setCardType] = useState('临时卡');
    const [balance, setBalance] = useState(0);
    const [searchCardId, setSearchCardId] = useState('');
    const [showEditPopup, setShowEditPopup] = useState(false); // 控制编辑弹窗
    const [editCard, setEditCard] = useState(null); // 当前编辑的停车卡信息

    const [currentPage, setCurrentPage] = useState(1); // 当前页
    const [itemsPerPage] = useState(20); // 每页显示条数

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

    // 删除停车卡
    const deleteParkingCard = async (cardId) => {
        const confirmDelete = window.confirm(`确定删除卡号 ${cardId} 吗？`);

        if (confirmDelete) {
            await api.deleteParkingCard(cardId);
            console.log("删除成功！")
            fetchParkingCards();
        }
    };

    // 打开编辑弹窗
    const openEditPopup = (card) => {
        setEditCard(card); // 设置当前编辑的停车卡
        setShowEditPopup(true); // 显示弹窗
    };

    // 关闭编辑弹窗
    const closeEditPopup = () => {
        setShowEditPopup(false); // 关闭弹窗
        setEditCard(null); // 清空编辑信息
    };

    // 修改停车卡
    const updateParkingCard = async () => {
        if (!editCard.card_id) {
            alert('卡号不能为空！');
            return;
        }
        await api.updateParkingCard(editCard); // 调用更新接口
        fetchParkingCards(); // 刷新数据
        closeEditPopup(); // 关闭弹窗
    };

    // 分页逻辑
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = cards.slice(indexOfFirstItem, indexOfLastItem); // 当前页数据
    const totalPages = Math.ceil(cards.length / itemsPerPage); // 总页数

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container">
            <h2>停车卡管理</h2>
            {/* 添加停车卡模块 */}
            <div className="card">
                <h3>添加停车卡</h3>
                <div>
                    <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                        <option value="临时卡">临时卡</option>
                        <option value="月租卡">月租卡</option>
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
            </div>

            {/* 查询停车卡模块 */}
            <div className="card">
                <h3>查询停车卡</h3>
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
            </div>

            {/* 停车卡列表模块 */}
            <div className="card">
                <h3>停车卡列表</h3>
                <p>总数据条数：{cards.length}</p>
                <table>
                    <thead>
                    <tr>
                        <th>卡号</th>
                        <th>类型</th>
                        <th>余额</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((card) => (
                        <tr key={card.card_id}>
                            <td>{card.card_id}</td>
                            <td>{card.card_type}</td>
                            <td>{card.balance}</td>
                            <td>
                                <button onClick={() => openEditPopup(card)}>修改</button>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteParkingCard(card.card_id)}
                                >
                                    删除
                                </button>
                            </td>
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

            {/* 编辑弹窗 */}
            {showEditPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>修改停车卡</h3>
                        <input
                            type="text"
                            placeholder="卡号"
                            value={editCard.card_id}
                            onChange={(e) =>
                                setEditCard({ ...editCard, card_id: e.target.value })
                            }
                            disabled
                        />
                        <select
                            value={editCard.card_type}
                            onChange={(e) =>
                                setEditCard({ ...editCard, card_type: e.target.value })
                            }
                        >
                            <option value="临时卡">临时卡</option>
                            <option value="月租卡">月租卡</option>
                            <option value="特种免费卡">特种免费卡</option>
                        </select>
                        <input
                            type="number"
                            placeholder="余额"
                            value={editCard.balance}
                            onChange={(e) =>
                                setEditCard({ ...editCard, balance: Number(e.target.value) })
                            }
                            min="0"
                        />
                        <button onClick={updateParkingCard}>提交</button>
                        <button onClick={closeEditPopup}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParkingCard;
