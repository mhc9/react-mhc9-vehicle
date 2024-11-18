import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaBus, FaClock, FaInfoCircle, FaMapMarkerAlt, FaUser, FaUsers, FaUndoAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import moment from 'moment'
import { getReservations, resetSuccess, cancel, finish } from '../../features/slices/reservationSlice'
import { generateQueryString, getUrlParam, toLongTHDate, toShortTHDate } from '../../utils'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import FilteringInputs from './FilteringInputs';
import Assignment from './Assignment';
import Drivers from './Drivers';
import TypeBadge from '../../components/Badges/TypeBadge'
import StatusBadge from '../../components/Badges/StatusBadge';

const ReservationList = () => {
    const initialFilters = { date: moment(), limit: 5 }
    const dispatch = useDispatch();
    const { reservations, pager, isLoading, isSuccess } = useSelector(state => state.reservation);
    const [endpoint, setEndpoint] = useState('');
    const [params, setParams] = useState(generateQueryString({ date: moment().format('YYYY-MM-DD'), limit: 5 }));
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
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายการจอง</Breadcrumb.Item>
                </Breadcrumb>
            </div>

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
                                <div className="flex max-[390px]:flex-col justify-between gap-1">
                                    <div className={`reservation-text max-[390px]:mb-1 max-[390px]:w-full lg:w-[90%] ${[3,9].includes(reservation.status) ? 'w-full' : 'w-[80%]'}`}>
                                        <p className="flex max-[495px]:flex-col items-center max-[495px]:items-start min-[495px]:gap-1">
                                            <span className="flex items-center">
                                                <FaClock />
                                                <span className="mx-1 max-sm:hidden">{toLongTHDate(moment(reservation.reserve_date).toDate())}</span>
                                                <span className="mx-1 hidden max-sm:inline-block">{toShortTHDate(reservation.reserve_date)}</span>
                                                <span>{moment(`${reservation.reserve_date} ${reservation.reserve_time}`).format('HH:mm')} น.</span>
                                            </span>
                                            <span className="flex flex-row items-center gap-1 ml-2 max-[495px]:ml-0">
                                                <FaUser /> <span className="text-blue-700 font-semibold">{reservation.contact_name}</span>
                                                <StatusBadge status={reservation.status} />
                                            </span>
                                        </p>
                                        <p className="flex max-[495px]:flex-col items-center max-[495px]:items-start min-[495px]:gap-1">
                                            <span className="flex flex-row items-center gap-1">
                                                <FaMapMarkerAlt />
                                                <TypeBadge type={reservation.type} />
                                                <span>{reservation.type_id === 1 ? 'จาก' : 'ที่'}</span>
                                                <span className="text-red-700">{reservation.destination}</span>
                                            </span>
                                        </p>
                                        <p className="flex flex-row items-center gap-2">
                                            <span className="flex flex-row items-center gap-1"><FaUsers />ผู้โดยสาร <b>{reservation.passengers}</b> คน</span>
                                            <span className="flex flex-row items-center gap-1 ml-1"><FaBus />ขอรถ <b>{reservation.vehicles}</b> คัน</span>
                                        </p>
                                        {reservation.remark && (
                                            <p className="text-xs text-green-700 flex flex-row items-center gap-1 pl-1">
                                                <FaInfoCircle /> <span className="text-sm font-thin">{reservation.remark}</span>
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-400 font-thin flex flex-row items-center gap-1 pl-1 mt-1">
                                            <FaUndoAlt /> {moment(reservation.updated_at).format('YYYY-MM-DD HH:mm')} น.
                                        </p>

                                        {reservation.assignments.length > 0 && (
                                            <div className="mt-2">
                                                <hr />

                                                <Drivers
                                                    assignments={reservation.assignments}
                                                    reserveDate={reservation.reserve_date}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`reservation-btn flex flex-col gap-1 ${[3,9].includes(reservation.status) && 'hidden'}`}>
                                        {reservation.status === 1 && (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => setToggleAssign(reservation.id)}
                                                    disabled={toggleAssign === reservation.id}
                                                >
                                                        จ่ายงาน
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => {
                                                        if (window.confirm('คุณต้องการยกเลิกรายการใช่หรือไม่?')) {
                                                            dispatch(cancel({ id: reservation.id, data: { status: 9 } }));
                                                        }
                                                    }}
                                                >
                                                    ลบ
                                                </button>
                                            </>
                                        )}

                                        {reservation.status === 2 && (
                                            <button
                                                type="button"
                                                className="btn btn-success"
                                                onClick={() => {
                                                    if (window.confirm('คุณต้องการจบงานใช่หรือไม่?')) {
                                                        dispatch(finish({ id: reservation.id, data: { status: 3 } }));
                                                    }
                                                }}
                                            >
                                                จบงาน
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <Assignment
                                    reservation={reservation}
                                    date={getUrlParam(params, 'date')}
                                    isToggle={toggleAssign === reservation.id}
                                    onCancel={() => setToggleAssign('')}
                                />
                            </div>
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