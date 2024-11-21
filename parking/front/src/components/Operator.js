// src/components/Operator.js
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
        const newOperator = { id: id, name: name, sex: sex, age: age };
        await api.addOperator(newOperator);
        fetchOperators();
    };

    const searchOperators = () => {
        if (searchTerm) {
            // 过滤操作员列表
            const filtered = operators.filter(
                (op) =>
                    op.id.includes(searchTerm) ||
                    op.name.includes(searchTerm)
            );
            setOperators(filtered);
        } else {
            fetchOperators(); // 查询词为空时，刷新列表
        }
    };

    const deleteOperator = async (operatorId) => {
        await api.deleteOperator(operatorId); // 调用删除 API
        fetchOperators(); // 刷新列表
    };

    return (
        <div>
            <h2>操作员管理</h2>

            {/* 添加操作员 */}
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

            {/* 查询操作员 */}
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

            {/* 显示操作员列表 */}
            <ul>
                {operators.map((op) => (
                    <li key={op.id}>
                        工号：{op.id}，姓名：{op.name}
                        <button onClick={() => deleteOperator(op.id)}>
                            删除
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Operator;
