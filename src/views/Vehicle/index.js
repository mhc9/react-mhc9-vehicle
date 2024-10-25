import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getVehicles } from '../../features/slices/vehicleSlice'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

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
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && vehicles) && vehicles.map(vehicle => (
                    <Col key={vehicle.id} md={6} lg={4} className="mb-2">
                        <div className="border rounded-md flex md:flex-col items-center p-2 relative">
                            <span className="border rounded-full w-[50px] h-[50px] flex items-center justify-center text-3xl font-bold text-white bg-black mb-2 max-md:hidden absolute top-1 left-1">
                                {vehicle.no}
                            </span>
                            <p className="border rounded-full w-[50px] h-[50px] flex items-center justify-center text-3xl font-bold text-white bg-black mr-1 md:hidden">
                                {vehicle.no}
                            </p>
                            <div className="flex justify-center items-center w-[160px] h-[100px] md:w-auto md:h-[180px] md:mb-2">
                                <img
                                    src={`
                                        ${vehicle.type_id === 2
                                            ? 'https://m.carryboycanopy.com/lift-up-window/son/son_double_cab/fiberglass-pickup-truck-hardtop-canopy_toyota-hilux-revo_son_so-series_carryboy.png'
                                            : (vehicle.owner_id === 15
                                                ? 'https://www.headlightmag.com/hlmwp/wp-content/uploads/2018/10/commuter_my2018_001.jpg'
                                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr7ZUm__B3KwpNDm4M3geRA4wKnBsfBxePOQ&s'
                                            )
                                        }
                                    `}
                                    alt="vehicle-pic"
                                    className="h-[100%]"
                                />
                            </div>
                            <div className="text-center flex flex-col items-center justify-center ml-8 md:ml-0">
                                <p className="text-xl font-semibold">
                                    {vehicle.type?.name}
                                    <span className="ml-2">{vehicle.reg_no}</span>
                                </p>
                                <p>{vehicle.owner?.name}</p>
                                <p className="font-semibold hover:text-blue-600">
                                    <Link to={`/driver/${vehicle.driver?.id}`}>{vehicle.driver?.firstname} {vehicle.driver?.lastname}</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                )) }
            </Row>

            {pager && (
                <Pagination
                    pager={pager}
                    onPageClick={(url) => setEndpoint(url)}
                />
            )}
        </div>
    )
}

export default VehicleList