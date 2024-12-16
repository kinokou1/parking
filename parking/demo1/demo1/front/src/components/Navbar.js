import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import exitIcon from '../exit.png';

const Navbar = ({ onLogin }) => {
    const [showExitPopup, setShowExitPopup] = useState(false); // 控制退出弹窗显示
    const navigate = useNavigate();

    const handleExit = () => {
        setShowExitPopup(true); // 显示退出弹窗
    };

    const closePopupAndRedirect = () => {
        setShowExitPopup(false); // 关闭退出弹窗
        onLogin(false); // 清除登录状态
        navigate('/login'); // 跳转到登录页面
    };

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <button className="exit-button" onClick={handleExit}>
                    <img src={exitIcon} alt="退出" />
                </button>
            </div>
            <ul>
                <li><Link to="/">车库管理</Link></li>
                <li><Link to="/operators">操作员管理</Link></li>
                <li><Link to="/parking-cards">停车卡管理</Link></li>
                <li><Link to="/vehicle-entry">车辆入库</Link></li>
                <li><Link to="/vehicle-exit">车辆出库</Link></li>
                <li><Link to="/parking-records">停车记录</Link></li>
            </ul>
            {/* 退出成功弹窗 */}
            {showExitPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>已退出</h3>
                        <p>您已成功退出登录。</p>
                        <button onClick={closePopupAndRedirect}>确定</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
