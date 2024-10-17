import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from '../../components/Calendar'

const Home = () => {
    return (
        <div className="p-2">
            <div className="flex flex-row justify-around mb-2">
                <Link to={'/reservation/add'} className="btn btn-primary">จองรถ</Link>
                <Link to={'/reservation'} className="btn btn-primary">รายการจอง</Link>
                <Link to={'/vehicle'} className="btn btn-primary">รถยนต์</Link>
                <Link to={'/driver'} className="btn btn-primary">คนขับ</Link>
            </div>
            <div className="pt-4">
                <Calendar />
            </div>
        </div>
    )
}

export default Home