import React from 'react'
import { FaBus, FaTimesCircle } from "react-icons/fa";

const DriverList = ({ assignments }) => {
    return (
        <div className="mt-2">
            <hr />

            <div className="mt-1 flex flex-row items-center">
                {assignments.map(assignment => (
                    <DriverBadge driver={assignment.driver} />
                ))}
            </div>
        </div>
    )
}

export default DriverList

const DriverBadge = ({ driver }) => {
    return (
        <span className="flex flex-row items-center gap-2 text-xs badge rounded-pill bg-success">
            <a href="#" className="flex flex-row items-center gap-1" onClick={() => {}}>
                <FaBus /> <span className="font-thin">{driver?.firstname}</span>
            </a>
            <FaTimesCircle size={'10px'} className="cursor-pointer hover:text-danger" />
        </span>
    )
}