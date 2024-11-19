import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { FaBus, FaRandom, FaTruck, FaInfoCircle } from "react-icons/fa";
import moment from 'moment';
import { getDriverAssignments } from '../../features/slices/driverSlice'
import Loading from '../../components/Loading'
import TypeBadge from '../../components/Badges/TypeBadge'
import ChangeDriver from './ChangeDriver'

const Drivers = ({ assignments, reserveDate }) => {
    const dispatch = useDispatch();
    const { driver, isLoading } = useSelector(state => state.driver);
    const [showModal, setShowModal] = useState(false);
    const [showChangeModal, setShowChagneModal] = useState(false);
    const [assigmentToCahnge, setAssignmentToCahnge] = useState(null);

    return (
        <div>
            <ModalDriverAssignments
                isShow={showModal}
                hide={() => setShowModal(false)}
                driver={driver}
                isLoading={isLoading}
            />

            <ChangeDriver
                isShow={showChangeModal}
                hide={() => setShowChagneModal(false)}
                date={reserveDate}
                data={assigmentToCahnge}
            />

            <div className="mt-1 px-1 flex flex-row items-center gap-1">
                {assignments.map(assignment => (
                    <DriverBadge
                        key={assignment.id}
                        assignedDriver={assignment.driver}
                        onClickBadge={(driverId) => {
                            dispatch(getDriverAssignments({ id: driverId, date: reserveDate }));
                            setShowModal(true);
                        }}
                        onChangeDriver={() => {
                            setAssignmentToCahnge(assignment);
                            setShowChagneModal(true);
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default Drivers

const DriverBadge = ({ assignedDriver, onClickBadge, onChangeDriver }) => {
    return (
        <span className="flex flex-row items-center gap-2 text-xs badge rounded-pill bg-success">
            <a href="#"
                className="flex flex-row items-center gap-1"
                onClick={() => onClickBadge(assignedDriver?.id)}
            >
                <FaBus /> <span className="font-thin">{assignedDriver?.firstname}</span>
            </a>
            <FaRandom size={'10px'} className="cursor-pointer hover:text-danger" onClick={onChangeDriver} />
        </span>
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
                <div className="h-[60vh]">
                    <ul>
                        {isLoading && <li className="text-center"><Loading /></li>}
                        {(!isLoading && driver) && driver?.assignments.map(assignment => (
                            <li className="flex flex-row items-center mb-1 border rounded-full py-1 px-3" key={assignment.id}>
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
                </div>
            </Modal.Body>
        </Modal>
    )
}