import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { resetSuccess } from '../../features/slices/reservationSlice'
import ReservationForm from './Form'

const AddReservation = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.reservation);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกสำเร็จ!!');
            dispatch(resetSuccess());
            navigate('/');
        }
    }, [isSuccess]);

    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item active>จองรถ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">จองรถ</h3>

            <div className="border rounded-md p-3">
                <ReservationForm />
            </div>
        </div>
    )
}

export default AddReservation