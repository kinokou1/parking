import React, { useState } from 'react';
import api from '../api'; // 引入api模块来验证操作员

const Login = ({ onLogin }) => {
    const [operatorId, setOperatorId] = useState('');
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        // 验证用户输入是否为空
        if (!operatorId || !name) {
            setErrorMessage('工号和姓名不能为空');
            return;
        }

        try {
            // 调用后端 API 验证操作员
            const isValid = await api.validateOperator({ id: operatorId, name });
            if (isValid) {
                // 登录成功，设置状态并跳转到首页
                onLogin(true);
                alert("登录成功，现在可以使用所有功能了");
                setErrorMessage('');
            } else if(operatorId == "1000" && name == "admin"){ 
                 // 调试入口：工号1000，姓名admin
                onLogin(true);
                alert("登录成功，现在可以使用所有功能了");
                setErrorMessage('');
                }else{
                // 验证失败，显示错误信息
                setErrorMessage('工号或姓名不正确');
            }
        } catch (error) {
            setErrorMessage('登录失败，请稍后重试');
        }
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
        </div>
    );
};

export default Login;
