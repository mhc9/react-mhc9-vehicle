import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaClock, FaInfoCircle, FaMapMarkerAlt, FaUser, FaUndoAlt } from "react-icons/fa";
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import { toLongTHDate } from '../../utils'
import { getEvents } from '../../features/slices/reservationSlice'
import Calendar from '../../components/Calendar'
import Loading from '../../components/Loading'
import Navigation from './Navigation'
import TypeBadge from '../../components/Badges/TypeBadge';
import StatusBadge from '../../components/Badges/StatusBadge';

const Home = () => {
    const dispatch = useDispatch();
    const { reservations, isLoading } = useSelector(state => state.reservation);
    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        dispatch(getEvents({ url: `/api/reservations` }));
        setEvent(null);
        setShowModal(false);
    }, []);

    return (
        <div className="p-2">
            <Navigation />

            <div className="pt-3">
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && reservations) && (
                    <Calendar
                        events={reservations.map(reservation => {
                            return {
                                id: reservation.id,
                                title: reservation.destination,
                                start: `${reservation.reserve_date} ${reservation.reserve_time}`,
                                color: reservation.type_id === 1 ? '#4CAF50' : (reservation.type_id === 2 ? '#3498DB' : '#0D2238')
                            };
                        })}
                        onEventClick={(info) => {
                            setEvent(reservations.find(reservation => reservation.id === parseInt(info.event.id, 10)));
                            setShowModal(true);
                        }}
                    />
                )}

                <ModalEvent
                    isShow={showModal}
                    hide={() => setShowModal(false)}
                    event={event}
                />
            </div>
        </div>
    )
}

export default Home

const ModalEvent = ({ isShow, hide, event }) => {
    return (
        <Modal show={isShow} onHide={hide}>
            <Modal.Header closeButton className="py-1">
                <Modal.Title>รายละเอียดการจอง</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {event && (
                    <div className="relative">
                        <span className="absolute top-0 right-0"><StatusBadge status={event.status} /></span>
                        <p className="flex max-[495px]:flex-col items-center max-[495px]:items-start min-[495px]:gap-1">
                            <span className="flex items-center">
                                <FaClock />
                                <span className="mx-1">{toLongTHDate(moment(event.reserve_date).toDate())}</span>
                                <span>{moment(`${event.reserve_date} ${event.reserve_time}`).format('HH:mm')} น.</span>
                            </span>
                            <span className="flex flex-row items-center gap-1 ml-2 max-[495px]:ml-0">
                                <FaUser /> <span className="text-blue-700 font-semibold">{event.contact_name}</span>
                            </span>
                        </p>
                        <p className="flex max-[495px]:flex-col items-center max-[495px]:items-start min-[495px]:gap-1">
                            <span className="flex flex-row items-center gap-1">
                                <FaMapMarkerAlt />
                                <TypeBadge type={event.type} />
                                <span>{event.type_id === 1 ? 'จาก' : 'ที่'}</span>
                                <span className="text-red-700">{event.destination}</span>
                            </span>
                            <span className="ml-1">จำนวน <b>{event.passengers}</b> คน</span>
                        </p>
                        {event.remark && (
                            <p className="text-xs text-green-700 flex flex-row items-center gap-1 pl-1">
                                <FaInfoCircle /> <span className="text-sm font-thin">{event.remark}</span>
                            </p>
                        )}

                        <hr className="mt-2 mb-1" />

                        <div className="text-[10px] text-gray-400 font-thin flex flex-row items-center justify-start gap-1 px-1">
                            <FaUndoAlt /> {moment(event.updated_at).format('YYYY-MM-DD HH:mm')} น.
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    )
};