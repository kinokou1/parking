import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // 引入api模块来验证操作员

const Login = ({ onLogin }) => {
    const [operatorId, setOperatorId] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // 控制成功弹窗显示
    const navigate = useNavigate(); // 跳转功能

    const handleLogin = async () => {
        if (!operatorId || !name) {
            setErrorMessage('工号和姓名不能为空');
            return;
        }
        if (operatorId === "1000" && name === "admin") { 
            // 调试入口：工号1000，姓名admin
            setErrorMessage('');
            setShowSuccessPopup(true); // 显示成功弹窗
            onLogin(true); // 更新登录状态
        } else {
            try {
                // 获取所有操作员数据
                const operators = await api.getOperators();

                // 查找是否有匹配的操作员
                const operator = operators.find(op => op.id === operatorId && op.name === name);

                if (operator) {
                    setErrorMessage('');
                    setShowSuccessPopup(true); // 显示成功弹窗
                    onLogin(true); // 更新登录状态
                } else {
                    setErrorMessage('工号或姓名不正确');
                }
            } catch (error) {
                setErrorMessage('登录失败，请稍后重试');
            }
        }
    };

    const closePopupAndRedirect = () => {
        setShowSuccessPopup(false); // 关闭弹窗
        navigate('/'); // 跳转到首页
    };

    return (
        <div className="login-container">
            <h2>登录</h2>
            <div className="login-form">
                <input
                    type="text"
                    placeholder="工号"
                    value={operatorId}
                    onChange={(e) => setOperatorId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleLogin}>登录</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            {/* 登录成功弹窗 */}
            {showSuccessPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>登录成功</h3>
                        <p>现在可以使用所有功能了。</p>
                        <button onClick={closePopupAndRedirect}>确定</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
