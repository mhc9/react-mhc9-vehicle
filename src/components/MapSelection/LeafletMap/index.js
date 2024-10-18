import React, { useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const center = [14.975299545851701, 102.1058307239686];

const LeafletMap = () => {

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        alert(`Clicked at: ${lat}, ${lng}`);
    };

    return (
        <MapContainer center={center} zoom={15} scrollWheelZoom={false} style={{ height: '500px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapEventsHandler handleMapClick={handleMapClick} />
        </MapContainer>
    )
}

const MapEventsHandler = ({ handleMapClick }) => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click(e) {
            // handleMapClick(e);
            const { lat, lng } = e.latlng;
            alert(`Clicked at: ${lat}, ${lng}`);

            // map.locate();

            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
        locationfound(e) {
            console.log(e.latlng);
        //     setPosition(e.latlng)
        //     map.flyTo(e.latlng, map.getZoom())
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default LeafletMap