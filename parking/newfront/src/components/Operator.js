import React, { useState, useEffect } from 'react';
import api from '../api';

const Operator = () => {
    const [operators, setOperators] = useState([]);
    const [id, setOperatorId] = useState('');
    const [name, setName] = useState('');
    const [sex, setGender] = useState('男');
    const [age, setAge] = useState(18);
    const [searchTerm, setSearchTerm] = useState(''); // 查询关键词

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
                <ul>
                    {operators.map((op) => (
                        <li key={op.id}>
                            工号：{op.id}，姓名：{op.name}，性别：{op.sex}，年龄：{op.age}
                            <button
                                className="delete-btn"
                                onClick={() => deleteOperator(op.id)}
                            >
                                删除
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Operator;
