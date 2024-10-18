import React from 'react'
import { Modal } from 'react-bootstrap'
// import LeafletMap from './LeafletMap'
import GoogleMap from './GoogleMap'

const MapSelection = ({ isShow, hide, onSelect }) => {
    return (
        <Modal
            show={isShow}
            onHide={hide}
            size='xl'
        >
            <Modal.Header className="border py-1" closeButton>
                <Modal.Title>เลือกสถานที่</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <GoogleMap />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default MapSelection