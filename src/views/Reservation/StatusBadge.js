import React from 'react'

const StatusBadge = ({ status }) => {
    const statusColor = ['bg-secondary','bg-warning','bg-success','bg-dark'];
    const statusText = ['รอดำเนินการ','จัดรถแล้ว','เสร็จแล้ว','ยกเลิก'];

    return (
        <span className={`badge rounded-pill ${statusColor[status-1]}`}>
            {statusText[status-1]}
        </span>
    )
}

export default StatusBadge