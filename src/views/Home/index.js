import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaAddressCard, FaBus, FaTasks, FaUserTie } from "react-icons/fa";
import { getEvents } from '../../features/slices/reservationSlice'
import Calendar from '../../components/Calendar'
import Loading from '../../components/Loading'

const Home = () => {
    const dispatch = useDispatch();
    const { reservations, isLoading } = useSelector(state => state.reservation);
    useEffect(() => {
        dispatch(getEvents({ url: `/api/reservations` }));
    }, []);

    return (
        <div className="p-2">
            <ul className="nav nav-pills nav-justified">
                <li className="nav-item">
                    <Link to={'/reservation/add'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                        <FaAddressCard /> จองรถ
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/reservation'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                        <FaTasks /> รายการจอง
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/vehicle'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                        <FaBus /> รถยนต์
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/driver'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                        <FaUserTie /> คนขับ
                    </Link>
                </li>
            </ul>

            <div className="pt-4">
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && reservations) && (
                    <Calendar events={reservations.map(reservation => {
                        return {
                            id: reservation.id,
                            title: reservation.destination,
                            start: `${reservation.reserve_date} ${reservation.reserve_time}`,
                            color: reservation.type_id === 1 ? '#4CAF50' : (reservation.type_id === 2 ? '#3498DB' : '#0D2238')
                        };
                    })} />
                )}
            </div>
        </div>
    )
}

export default Home