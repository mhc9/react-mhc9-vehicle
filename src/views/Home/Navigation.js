import React from 'react'
import { Link } from 'react-router-dom'
import { FaAddressCard, FaBus, FaTasks, FaUserTie } from "react-icons/fa";

const Navigation = () => {
    return (
        <ul className="nav nav-pills nav-justified">
            <li className="nav-item max-[512px]:text-sm">
                <Link to={'/reservation/add'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                    <FaAddressCard /> <span>จอง<span className="max-[472px]:hidden">รถ</span></span>
                </Link>
            </li>
            <li className="nav-item max-[512px]:text-sm">
                <Link to={'/reservation'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                    <FaTasks /> <span>รายการ<span className="max-[472px]:hidden">จอง</span></span>
                </Link>
            </li>
            <li className="nav-item max-[512px]:text-sm">
                <Link to={'/vehicle'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                    <FaBus /> <span>รถ<span className="max-[472px]:hidden">ยนต์</span></span>
                </Link>
            </li>
            <li className="nav-item max-[512px]:text-sm">
                <Link to={'/driver'} className="nav-link border hover:bg-zinc-200 flex flex-col md:flex-row items-center justify-center gap-1">
                    <FaUserTie /> คนขับ
                </Link>
            </li>
        </ul>
    )
}

export default Navigation