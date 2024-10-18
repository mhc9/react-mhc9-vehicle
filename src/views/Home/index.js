import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
            <div className="flex flex-row justify-around mb-2">
                <Link to={'/reservation/add'} className="btn btn-primary">จองรถ</Link>
                <Link to={'/reservation'} className="btn btn-primary">รายการจอง</Link>
                <Link to={'/vehicle'} className="btn btn-primary">รถยนต์</Link>
                <Link to={'/driver'} className="btn btn-primary">คนขับ</Link>
            </div>
            <div className="pt-4">
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && reservations) && (
                    <Calendar events={reservations.map(reservation => {
                        return {
                            id: reservation.id,
                            title: reservation.destination,
                            start: `${reservation.reserve_date} ${reservation.reserve_time}`
                        };
                    })} />
                )}
            </div>
        </div>
    )
}

export default Home