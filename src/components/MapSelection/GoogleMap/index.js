import React, { useState } from 'react'
import { Map } from '@vis.gl/react-google-maps'
import PoiMarkers from './PoiMarkers'
import axios from 'axios';

const center = {
    lat: 14.98341003859137,
    lng: 102.10487365722656,
}

const locations = [
    {key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }},
    {key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 }},
    {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
    {key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 }},
    {key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 }},
    {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
    {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
    {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
    {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
    {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
    {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
    {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
    {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
    {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
    {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
];

const GMAP_API_KEY = process.env.REACT_APP_GMAP_API_KEY;

const GoogleMap = ({ onSelect }) => {
    const getPlaceDetail = async (placeId) => {
        try {
            const res = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?fields=name&place_id=${placeId}&key=${GMAP_API_KEY}`);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Map
            style={{width: '100%', height: '500px'}}
            defaultCenter={center}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            onCameraChanged={(ev) =>
                console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
            }
            onClick={(e) => {
                console.log(e);
                // getPlaceDetail(e.detail.placeId);
                onSelect(e.detail.latLng);
            }}
        >
            {/* <PoiMarkers pois={locations} /> */}
        </Map>
    )
}

export default GoogleMap