import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaClock, FaMapMarkerAlt, FaUser, FaUndoAlt } from "react-icons/fa";
import moment from 'moment'
import { getReservations } from '../../features/slices/reservationSlice'
import { toLongTHDate } from '../../utils'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const ReservationList = () => {
    const dispatch = useDispatch();
    const { reservations, pager, isLoading } = useSelector(state => state.reservation);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getReservations({ url: `/api/reservations/search?page=` }));
        } else {
            dispatch(getReservations({ url: `${endpoint}` }));
        }
    }, [endpoint]);

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>รายการจอง</Breadcrumb.Item>
            </Breadcrumb>

            <div className="flex flex-row items-end justify-between mb-3">
                <h3 className="font-bold text-lg">รายการจอง</h3>
                <Link to="/reservation/add" className="btn btn-dark">จองรถ</Link>
            </div>

            <Row>
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && reservations) && reservations.map(reservation => (
                    <Col key={reservation.id} md={6} className="md:mb-2 max-sm:mb-2">
                        <div className="app-card border rounded-md p-3">
                            <p className="flex flex-row items-center gap-1">
                                <FaClock /> {toLongTHDate(moment(reservation.reserve_date).toDate())} {reservation.reserve_time} น.
                            </p>
                            <p className="flex flex-row items-center gap-1">
                                <FaUser /> {reservation.contact_name}
                            </p>
                            <p className="flex flex-row items-center gap-1">
                                <FaMapMarkerAlt />
                                <span className="text-red-700 ml-1">{reservation.destination}</span>
                                <span className="ml-2">จำนวน <b>{reservation.passengers}</b> คน</span>
                            </p>
                            <p className="text-[10px] text-gray-400 font-thin flex flex-row items-center gap-1 pl-1">
                                <FaUndoAlt /> {moment(reservation.updated_at).format('YYYY-MM-DD HH:mm')} น.
                            </p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default ReservationList