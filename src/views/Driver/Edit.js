import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import DriverForm from './Form'
import { getDriver } from '../../features/slices/driverSlice'
import { useDispatch, useSelector } from 'react-redux'

const EditDriver = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { driver, isLoading } = useSelector(state => state.driver);

    useEffect(() => {
        if (id) dispatch(getDriver(id));
    }, [id]);

    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/driver" }}>คนขับ</Breadcrumb.Item>
                    <Breadcrumb.Item active>แก้ไขคนขับ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">แก้ไขคนขับ (ID: {id})</h3>

            <div className="border rounded-md p-4">
                {isLoading && <div className="text-center">Loading ...</div>}
                <DriverForm driver={driver} />
            </div>
        </div>
    )
}

export default EditDriver