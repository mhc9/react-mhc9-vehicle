import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { FaBus, FaTimesCircle } from "react-icons/fa";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

const DriverList = ({ assignments }) => {
    return (
        <div className="mt-2">
            <hr />

            <div className="mt-1 flex flex-row items-center">
                {assignments.map(assignment => (
                    <DriverBadge driver={assignment.driver} />
                ))}
            </div>
        </div>
    )
}

export default DriverList

const DriverBadge = ({ driver }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ModalDriverAssignments
                isShow={showModal}
                hide={() => setShowModal(false)}
                driver={driver}
                date={moment()}
            />

            <span className="flex flex-row items-center gap-2 text-xs badge rounded-pill bg-success">
                <a href="#" className="flex flex-row items-center gap-1" onClick={() => setShowModal(true)}>
                    <FaBus /> <span className="font-thin">{driver?.firstname}</span>
                </a>
                <FaTimesCircle size={'10px'} className="cursor-pointer hover:text-danger" />
            </span>
        </>
    )
}

const ModalDriverAssignments = ({ isShow, hide, driverId, date }) => {
    const dispatch = useDispatch();
    const { driver } = useSelector(state => state.driver);

    useEffect(() => {
        
    }, [driverId, date]);

    return (
        <Modal
            show={isShow}
            onHide={hide}
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-bordered table-hover table-striped">
                    {driver && driver.assignments.map(assignment => (
                        <tr>
                            <td></td>
                        </tr>
                    ))}
                </table>
            </Modal.Body>
        </Modal>
    )
}