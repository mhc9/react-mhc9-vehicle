import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { assign } from '../../../features/slices/reservationSlice'
import Assign from './Assign';

const Assignment = ({ reservation, date, isToggle, onCancel }) => {
    const dispatch = useDispatch();

    const handleCancel = (formik) => {
        formik.resetForm();
        onCancel();
    };

    const handleSubmit = (data, formik) => {
        dispatch(assign({ id: reservation.id, data }));
        onCancel();
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                reservation_id: reservation ? reservation.id : '',
                assignments: [],
            }}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                console.log(formik.values);
                
                return (
                    <Form>
                        <div 
                            className={`
                                ${isToggle
                                    ? 'h-auto opacity-100 max-[390px]:mb-0'
                                    : 'h-0 overflow-hidden opacity-0'
                                } transition-all duration-500 px-1
                            `}
                        >
                            <h3 className="text-lg font-bold mb-1">จ่ายงาน</h3>
                            {Array(reservation.vehicles).fill(0).map((vehicle, index) => (
                                <Fragment key={index}>
                                    <div className="px-2">
                                        <h3 className="font-bold underline">คันที่ {index+1}</h3>

                                        <Assign
                                            reservation={reservation}
                                            date={date}
                                            onSubmit={(assignment) => {
                                                formik.setFieldValue('assignments', [...formik.values.assignments, assignment]);

                                                setTimeout(() => formik.setFieldTouched('assignments', true), 1000);
                                            }}
                                        />
                                    </div>

                                    {index < Array(reservation.vehicles).fill(0).length -1 && <hr className="mb-1" />}
                                </Fragment>
                            ))}

                            <div className="flex justify-end px-2 pb-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-sm mr-1"
                                >
                                    บันทึกจ่ายงาน
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => onCancel()}>
                                    ยกเลิก
                                </button>
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Assignment