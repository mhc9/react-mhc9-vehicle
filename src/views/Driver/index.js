import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { getDrivers } from '../../features/slices/driverSlice'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'

const DriverList = () => {
    const dispatch = useDispatch();
    const { drivers, pager, isLoading } = useSelector(state => state.driver);
    const [endpoint, setEndpoint] = useState('');

    useEffect(() => {
        if (endpoint === '') {
            dispatch(getDrivers({ url: `/api/drivers/search`}));
        } else {
            dispatch(getDrivers({ url: `${endpoint}`}));
        }
    }, [endpoint]);

    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item active>คนขับ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">คนขับ</h3>

            <Row>
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && drivers) && drivers.map(driver => (
                    <Col key={driver.id} md={6} lg={4} className="mb-2">
                        <div className="border rounded-md flex md:flex-col md:justify-center md:items-center gap-3 py-3 px-4">
                            <div className="w-[80px] h-[80px] border rounded-full overflow-hidden">
                                <img src="https://cdn4.iconfinder.com/data/icons/taxi-service-flat/90/driver__taxi__cab__avatar_-512.png" alt="driver-pic" className="w-full" />
                            </div>
                            <div className="text-center flex flex-col items-start md:items-center justify-center">
                                <p className="text-xl font-semibold">{driver.firstname} {driver.lastname} ({driver.nickname})</p>
                                <p className="text-lg">{driver.member_of?.name}</p>
                                <p className="flex items-center gap-1 mb-2">
                                    <FaPhoneSquareAlt size={'20px'} />
                                    <a href={`tel:${driver.tel}`} className="text-lg hover:text-blue-600">{driver.tel}</a>
                                </p>

                                <Link to={`/driver/${driver.id}/assignments`} className="btn btn-outline-primary">
                                    รายการขับรถ
                                </Link>
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

export default DriverList