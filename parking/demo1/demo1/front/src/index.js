// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './style.css';

// 获取根容器，并渲染 App 组件到页面上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
