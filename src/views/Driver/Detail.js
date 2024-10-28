import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FaPhoneSquareAlt } from 'react-icons/fa'
import { getDriver } from '../../features/slices/driverSlice'
import Loading from '../../components/Loading'

const DriverDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { driver, isLoading } = useSelector(state => state.driver);

    useEffect(() => {
        if (id) dispatch(getDriver(id))
    }, [id]);

    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายละเอียดคนขับ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">รายละเอียดคนขับ (#{id})</h3>

            <Row>
                {isLoading && <div className="text-center"><Loading /></div>}
                {(!isLoading && driver) && (
                    <Col md={12} className="mb-2">
                        <div className="border rounded-md flex md:flex-col md:justify-center md:items-center gap-3 py-3 px-4">
                            <div className="w-[80px] h-[80px] border rounded-full overflow-hidden">
                                <img src="https://cdn4.iconfinder.com/data/icons/taxi-service-flat/90/driver__taxi__cab__avatar_-512.png" alt="driver-pic" className="w-full" />
                            </div>
                            <div className="text-center flex flex-col items-start md:items-center justify-center">
                                <p className="text-xl font-semibold">{driver.firstname} {driver.lastname}</p>
                                <p className="text-lg">{driver.member_of?.name}</p>
                                <p className="flex items-center gap-1">
                                    <FaPhoneSquareAlt size={'20px'} />
                                    <a href={`tel:${driver.tel}`} className="text-lg hover:text-blue-600">{driver.tel}</a>
                                </p>
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    )
}

export default DriverDetail