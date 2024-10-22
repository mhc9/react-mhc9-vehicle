import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaClock, FaInfoCircle, FaMapMarkerAlt, FaUser, FaUndoAlt } from "react-icons/fa";
import moment from 'moment'
import { getReservations, resetSuccess } from '../../features/slices/reservationSlice'
import { generateQueryString, toLongTHDate } from '../../utils'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import FilteringInputs from './FilteringInputs';
import Assign from './Assign';
import DriverList from './DriverList';
import { toast } from 'react-toastify';

const ReservationList = () => {
    const initialFilters = { date: moment(), limit: 5 }
    const dispatch = useDispatch();
    const { reservations, pager, isLoading, isSuccess } = useSelector(state => state.reservation);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString({ date: '', limit: 5 }));
    const [toggleAssign, setToggleAssign] = useState('');

    useEffect(() => {
        if (isSuccess) {
            toast.success("บันทึกสำเร็จ!!");
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getReservations({ url: `/api/reservations/search?page=${params}` }));
        } else {
            dispatch(getReservations({ url: `${endpoint}${params}` }));
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

            <FilteringInputs
                initialFilters={initialFilters}
                onFilter={(queryStr) => {
                    setParams(queryStr);
                    setEndpoint(prev => prev === '' ? `/api/reservations/search?page=` : '');
                }}
            />

            <Row>
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && reservations) && reservations.map(reservation => (
                    <Col key={reservation.id} md={12} className="md:mb-2 max-sm:mb-2">
                        <div className="app-card border rounded-md px-3 pt-3 pb-2">
                            <div className="flex flex-col">
                                <div className="flex flex-row justify-between">
                                    <div>
                                        <p className="flex flex-row items-center gap-1">
                                            <FaClock />
                                            <span className="ml-1">{toLongTHDate(moment(reservation.reserve_date).toDate())} {reservation.reserve_time} น.</span>
                                            <span className="flex flex-row items-center gap-1 ml-2">
                                                <FaUser /> <span className="text-blue-700 font-semibold">{reservation.contact_name}</span>
                                            </span>
                                        </p>
                                        <p className="flex flex-row items-center gap-1">
                                            <FaMapMarkerAlt />
                                            <span className={`badge badge-pill ${reservation.type_id === 1 ? 'bg-success' : (reservation.type_id === 2 ? 'bg-primary' : 'bg-dark')} ml-1`}>
                                                {reservation.type?.name}
                                            </span>
                                            <span>{reservation.type_id === 1 ? 'จาก' : 'ที่'}</span>
                                            <span className="text-red-700">{reservation.destination}</span>
                                            <span className="ml-1">จำนวน <b>{reservation.passengers}</b> คน</span>
                                        </p>
                                        {reservation.remark && (
                                            <p className="text-xs text-green-700 flex flex-row items-center gap-1 pl-1">
                                                <FaInfoCircle /> <span className="text-sm font-thin">{reservation.remark}</span>
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-400 font-thin flex flex-row items-center gap-1 pl-1">
                                            <FaUndoAlt /> {moment(reservation.updated_at).format('YYYY-MM-DD HH:mm')} น.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {reservation.status === 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() => setToggleAssign(reservation.id)}
                                                disabled={toggleAssign === reservation.id}
                                            >
                                                    จ่ายงาน
                                            </button>
                                        )}
                                        <button type="button" className="btn btn-secondary">ยกเลิก</button>
                                    </div>
                                </div>
                            </div>

                            <Assign
                                reservation={reservation}
                                isToggle={toggleAssign === reservation.id}
                                onCancel={() => setToggleAssign('')}
                            />

                            {reservation.assignments.length > 0 && (
                                <DriverList assignments={reservation.assignments} />
                            )}
                        </div>
                    </Col>
                ))}
            </Row>

            {pager && (
                <Pagination
                    pager={pager}
                    onPageClick={(url) => setEndpoint(url)}
                />
            )}
        </div>
    )
}

export default ReservationList