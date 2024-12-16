import React, { useState, useEffect } from 'react';
import api from '../api';

const Operator = () => {
    const [operators, setOperators] = useState([]);
    const [id, setOperatorId] = useState('');
    const [name, setName] = useState('');
    const [sex, setGender] = useState('男');
    const [age, setAge] = useState(18);
    const [searchTerm, setSearchTerm] = useState(''); // 查询关键词
    const [showEditPopup, setShowEditPopup] = useState(false); // 控制编辑弹窗显示
    const [editOperator, setEditOperator] = useState(null); // 当前正在编辑的操作员信息

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = async () => {
        const data = await api.getOperators();
        setOperators(data);
    };

    const addOperator = async () => {
        if (!id || !name) {
            alert('工号和姓名不能为空！');
            return;
        }
        const newOperator = { id, name, sex, age };
        await api.addOperator(newOperator);
        fetchOperators();
        setOperatorId('');
        setName('');
        setGender('男');
        setAge(18);
    };

    const searchOperators = () => {
        if (searchTerm) {
            const filtered = operators.filter(
                (op) =>
                    op.id.includes(searchTerm) ||
                    op.name.includes(searchTerm)
            );
            if (filtered.length === 0) {
                alert('未找到匹配的操作员！');
            }
            setOperators(filtered);
        } else {
            fetchOperators();
        }
    };

    const deleteOperator = async (operatorId) => {
        const confirmDelete = window.confirm(`确定删除工号为 ${operatorId} 的操作员吗？`);
        if (confirmDelete) {
            await api.deleteOperator(operatorId);
            fetchOperators();
        }
    };

    const openEditPopup = (operator) => {
        setEditOperator(operator); // 设置当前要编辑的操作员信息
        setShowEditPopup(true); // 显示弹窗
    };

    const closeEditPopup = () => {
        setShowEditPopup(false); // 关闭弹窗
        setEditOperator(null); // 清空编辑信息
    };

    const updateOperator = async () => {
        if (!editOperator.id || !editOperator.name) {
            alert('工号和姓名不能为空！');
            return;
        }
        await api.updateOperator(editOperator); // 调用更新接口
        fetchOperators(); // 刷新数据
        closeEditPopup(); // 关闭弹窗
    };

    // 分页逻辑
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [itemsPerPage] = useState(20); // 每页显示条目数
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = operators.slice(indexOfFirstItem, indexOfLastItem); // 当前页数据
    const totalPages = Math.ceil(operators.length / itemsPerPage); // 总页数

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container">
            <h2>操作员管理</h2>
            {/* 添加操作员模块 */}
            <div className="card">
                <h3>添加操作员</h3>
                <div>
                    <input
                        type="text"
                        placeholder="工号"
                        value={id}
                        onChange={(e) => setOperatorId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="姓名"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <select
                        value={sex}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                    <input
                        type="number"
                        placeholder="年龄"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        min="18"
                        max="65"
                    />
                    <button onClick={addOperator}>添加操作员</button>
                </div>
            </div>

            {/* 查询操作员模块 */}
            <div className="card">
                <h3>查询操作员</h3>
                <div>
                    <input
                        type="text"
                        placeholder="输入工号或姓名查询"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={searchOperators}>查询</button>
                    <button onClick={fetchOperators}>重置</button>
                </div>
            </div>

            {/* 操作员列表模块 */}
            <div className="card">
                <h3>操作员列表</h3>
                <p>总数据条数：{operators.length}</p>
                <table>
                    <thead>
                    <tr>
                        <th>工号</th>
                        <th>姓名</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((op) => (
                        <tr key={op.id}>
                            <td>{op.id}</td>
                            <td>{op.name}</td>
                            <td>{op.sex}</td>
                            <td>{op.age}</td>
                            <td>
                                <button
                                    onClick={() => openEditPopup(op)}
                                >
                                    修改
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => deleteOperator(op.id)}
                                >
                                    删除
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {/* 分页控件 */}
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
                        <h3>修改操作员</h3>
                        <input
                            type="text"
                            placeholder="工号"
                            value={editOperator.id}
                            onChange={(e) =>
                                setEditOperator({ ...editOperator, id: e.target.value })
                            }
                            disabled
                        />
                        <input
                            type="text"
                            placeholder="姓名"
                            value={editOperator.name}
                            onChange={(e) =>
                                setEditOperator({ ...editOperator, name: e.target.value })
                            }
                        />
                        <select
                            value={editOperator.sex}
                            onChange={(e) =>
                                setEditOperator({ ...editOperator, sex: e.target.value })
                            }
                        >
                            <option value="男">男</option>
                            <option value="女">女</option>
                        </select>
                        <input
                            type="number"
                            placeholder="年龄"
                            value={editOperator.age}
                            onChange={(e) =>
                                setEditOperator({ ...editOperator, age: Number(e.target.value) })
                            }
                            min="18"
                            max="65"
                        />
                        <button onClick={updateOperator}>提交</button>
                        <button onClick={closeEditPopup}>取消</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Operator;
