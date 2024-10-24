import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../../features/slices/reservationSlice'
import Calendar from '../../components/Calendar'
import Loading from '../../components/Loading'
import Navigation from './Navigation'

const Home = () => {
    const dispatch = useDispatch();
    const { reservations, isLoading } = useSelector(state => state.reservation);
    useEffect(() => {
        dispatch(getEvents({ url: `/api/reservations` }));
    }, []);

    return (
        <div className="p-2">
            <Navigation />

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