import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FaBus, FaTimesCircle, FaTruck, FaInfoCircle } from "react-icons/fa";
import moment from 'moment';
import { getDriver } from '../../features/slices/driverSlice'
import Loading from '../../components/Loading'
import TypeBadge from '../../components/Badges/TypeBadge'

const DriverList = ({ assignments }) => {
    return (
        <div className="mt-2">
            <hr />

            <div className="mt-1 px-1 flex flex-row items-center">
                {assignments.map(assignment => (
                    <DriverBadge assignedDriver={assignment.driver} />
                ))}
            </div>
        </div>
    )
}

export default DriverList

const DriverBadge = ({ assignedDriver }) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { driver, isLoading } = useSelector(state => state.driver);

    return (
        <>
            <ModalDriverAssignments
                isShow={showModal}
                hide={() => setShowModal(false)}
                driver={driver}
                isLoading={isLoading}
            />

            <span className="flex flex-row items-center gap-2 text-xs badge rounded-pill bg-success">
                <a href="#"
                    className="flex flex-row items-center gap-1"
                    onClick={() => {
                        dispatch(getDriver(assignedDriver?.id));
                        setShowModal(true);
                    }}
                >
                    <FaBus /> <span className="font-thin">{assignedDriver?.firstname}</span>
                </a>
                <FaTimesCircle size={'10px'} className="cursor-pointer hover:text-danger" />
            </span>
        </>
    )
}

const ModalDriverAssignments = ({ isShow, hide, driver, isLoading }) => {
    return (
        <Modal
            show={isShow}
            onHide={hide}
            size='lg'
        >
            <Modal.Header closeButton className="py-1">
                <Modal.Title>{driver?.firstname} {driver?.lastname}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {isLoading && <li className="text-center"><Loading /></li>}
                    {(!isLoading && driver) && driver?.assignments.map(assignment => (
                        <li className="flex flex-row items-center mb-1 border rounded-full py-1 px-3">
                            <FaTruck />
                            <span className="mx-1">{moment(`${assignment.reservation?.reserve_date} ${assignment.reservation?.reserve_time}`).format('HH:mm')} น.</span>
                            <TypeBadge type={assignment.reservation?.type} />
                            <span className="mx-1">{assignment.reservation?.type_id === 1 ? 'จาก' : 'ที่'}</span>
                            <span className="">{assignment.reservation?.destination}</span>
                            {assignment.reservation?.remark && (
                                <span className="text-xs text-green-700 flex flex-row items-center gap-1 pl-1">
                                    <FaInfoCircle /> <span className="text-sm font-thin">{assignment.reservation?.remark}</span>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    )
}