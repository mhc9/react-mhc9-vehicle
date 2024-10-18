import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import React from 'react'

const PoiMarkers = ({ pois }) => {
    return (
        <>
            {pois.map(poi => (
                <AdvancedMarker key={poi.key} position={poi.location}>
                    <Pin  background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    )
}

export default PoiMarkers