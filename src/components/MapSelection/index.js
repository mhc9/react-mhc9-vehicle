import React from 'react'
import { Modal } from 'react-bootstrap'
import MapLeaflet from './MapLeaflet'
// import MapGoogle from './MapGoogle'

const MapSelection = ({ isShow, hide, onSelect }) => {
    return (
        <Modal
            show={isShow}
            onHide={hide}
            size='xl'
        >
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <MapLeaflet />
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default MapSelection