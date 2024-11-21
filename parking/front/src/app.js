// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Garage from './components/Garage';
import Operator from './components/Operator';
import ParkingCard from './components/ParkingCard';
import VehicleEntry from './components/VehicleEntry';
import VehicleExit from './components/VehicleExit';
import ParkingRecords from './components/ParkingRecords';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <div>
                <h1>停车管理系统</h1>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Garage />} />
                    <Route path="/operators" element={<Operator />} />
                    <Route path="/parking-cards" element={<ParkingCard />} />
                    <Route path="/vehicle-entry" element={<VehicleEntry />} />
                    <Route path="/vehicle-exit" element={<VehicleExit />} />
                    <Route path="/parking-records" element={<ParkingRecords />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
