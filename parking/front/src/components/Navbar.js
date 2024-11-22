import React from 'react';
import { Link } from 'react-router-dom';
import exitIcon from '../exit.png'; 

const Navbar = () => {
    const handleExit = () => {
        alert('已退出');
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
        </nav>
    );
};

export default Navbar;
