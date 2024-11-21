import React from "react";
import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layouts/Default";
import Home from './views/Home'
import ReservationList from './views/Reservation'
import AddReservation from './views/Reservation/Add'
import EditReservation from './views/Reservation/Edit'
import VehicleList from './views/Vehicle'
import DriverList from './views/Driver'
import DriverDetail from "./views/Driver/Detail";
import DriverAssignmentList from "./views/Driver/AssignmentList";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="/reservation" element={<ReservationList />} />
                <Route path="/reservation/add" element={<AddReservation />} />
                <Route path="/reservation/:id/edit" element={<EditReservation />} />
                <Route path="/vehicle" element={<VehicleList />} />
                <Route path="/driver" element={<DriverList />} />
                <Route path="/driver/:id" element={<DriverDetail />} />
                <Route path="/driver/:id/assignments" element={<DriverAssignmentList />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default App;
