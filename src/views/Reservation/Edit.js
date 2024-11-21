import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getReservation, resetSuccess } from '../../features/slices/reservationSlice'
import ReservationForm from './Form'
import Loading from '../../components/Loading'

const EditReservation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reservation, isLoading, isSuccess } = useSelector(state => state.reservation);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกการแก้ไขสำเร็จ!!');
            dispatch(resetSuccess());
            navigate('/');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (id) dispatch(getReservation(id));
    }, [id]);

    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/reservation" }}>รายการจอง</Breadcrumb.Item>
                    <Breadcrumb.Item active>แก้ไขจองรถ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">แก้ไขจองรถ</h3>

            <div className="border rounded-md p-3">
                {isLoading && <div className="text-center"><Loading /></div>}

                {(!isLoading && reservation) && (
                    <ReservationForm  reservation={reservation} />
                )}
            </div>
        </div>
    )
}

export default EditReservation