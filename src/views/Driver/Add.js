import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'react-bootstrap'
import DriverForm from './Form'

const AddDriver = () => {
    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายละเอียดคนขับ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">เพิ่มคนขับ</h3>

            <div className="border rounded-md p-4">
                <DriverForm />
            </div>
        </div>
    )
}

export default AddDriver