import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicles } from '../../features/slices/vehicleSlice'

const VehicleList = () => {
    const dispatch = useDispatch();
    const { vehicles, pager, isLoading } = useSelector(state => state.vehicle);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getVehicles({ url: `/api/vehicles/search`}));
        } else {
            dispatch(getVehicles({ url: `${endpoint}`}));
        }
    }, [endpoint]);

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>รถยนต์</Breadcrumb.Item>
            </Breadcrumb>

            <h3 className="font-bold text-lg mb-2">รถยนต์</h3>

            <Row>
                {isLoading && <div>Loading...</div>}
                {(!isLoading && vehicles) && vehicles.map(vehicle => (
                    <Col key={vehicle.id}>
                        <div className="border rounded-md flex flex-col p-2">
                            <img src="" alt="" />
                            <div className="text-center flex flex-col items-center justify-center">
                                <p className="border rounded-full w-[40px] h-[40px] flex items-center justify-center font-bold">{vehicle.no}</p>
                                <p className="text-xl font-semibold">{vehicle.type?.name}</p>
                                <p>{vehicle.owner?.name}</p>
                                <p className="font-semibold">{vehicle.driver?.firstname} {vehicle.driver?.lastname}</p>
                                <p>{vehicle.driver?.tel}</p>
                            </div>
                        </div>
                    </Col>
                )) }
            </Row>
        </div>
    )
}

export default VehicleList