// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
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
