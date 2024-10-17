import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layouts/Default";
import Home from './views/Home'
import AddReservation from './views/Reservation/Add'
import ReservationList from './views/Reservation'
import VehicleList from './views/Vehicle'
import DriverList from './views/Driver'

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/reservation/add" element={<AddReservation />} />
                <Route path="/reservation" element={<ReservationList />} />
                <Route path="/vehicle" element={<VehicleList />} />
                <Route path="/driver" element={<DriverList />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;
