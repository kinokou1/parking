// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Garage from './components/Garage';
import Operator from './components/Operator';
import ParkingCard from './components/ParkingCard';
import VehicleEntry from './components/VehicleEntry';
import VehicleExit from './components/VehicleExit';
import ParkingRecords from './components/ParkingRecords';
import Navbar from './components/Navbar';
import Login from './components/Login';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 登录状�?

    const handleLogin = (status) => {
        setIsAuthenticated(status);
    };

    return (
        <Router>
            <div>
                <Navbar onLogin={handleLogin} />
                <Routes>
                    {/* 如果已登录，则可以访问主页面 */}
                    <Route
                        path="/"
                        element={isAuthenticated ? <Garage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/operators"
                        element={isAuthenticated ? <Operator /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/parking-cards"
                        element={isAuthenticated ? <ParkingCard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/vehicle-entry"
                        element={isAuthenticated ? <VehicleEntry /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/vehicle-exit"
                        element={isAuthenticated ? <VehicleExit /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/parking-records"
                        element={isAuthenticated ? <ParkingRecords /> : <Navigate to="/login" />}
                    />
                    {/* 登录页面 */}
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;