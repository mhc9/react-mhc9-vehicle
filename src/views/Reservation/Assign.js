import React from 'react'
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useGetInitialFormDataQuery } from '../../features/services/reservationApi'
import { assign } from '../../features/slices/reservationSlice'

const assignSchema = Yup.object().shape({
    driver_id: Yup.string().required(),
    vehicle_id: Yup.string().required(),
});

const Assign = ({ reservation, isToggle, onCancel }) => {
    const dispatch = useDispatch();
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const setDefaultVehicles = (formik, driverId) => {
        const newVehicles = formData && formData.vehicles.filter(vehicle => vehicle.driver_id === parseInt(driverId, 10));

        if (newVehicles.length > 0) {
            formik.setFieldValue('vehicle_id', newVehicles[0].id);
        }
    };

    const handleCancel = (formik) => {
        formik.resetForm();
        onCancel();
    };

    const handleSubmit = (data, formik) => {
        dispatch(assign({ id: reservation.id, data }));
        onCancel();
    };

    return (
        <div 
            className={`
                ${isToggle
                    ? 'h-auto opacity-100 py-2 my-2'
                    : 'h-0 overflow-hidden opacity-0'
                } transition-all duration-500 px-1
            `}
        >
            <hr />

            <div className="mt-1 px-4">
                <h3 className="text-lg font-bold mb-1">จ่ายงาน</h3>

                <Formik
                    enableReinitialize
                    initialValues={{
                        reservation_id: reservation ? reservation.id : '',
                        driver_id: '',
                        vehicle_id: '',
                        remark: '',
                    }}
                    validationSchema={assignSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Form>
                                <div className="mb-2">
                                    <Row>
                                        <Col md={6}>
                                            <label htmlFor="">ผู้ขับ :</label>
                                            <select
                                                name="driver_id"
                                                value={formik.values.driver_id}
                                                onChange={(e) => {
                                                    formik.handleChange(e);
                                                    setDefaultVehicles(formik, e.target.value);
                                                }}
                                                className="form-control text-sm"
                                            >
                                                <option value="">-- เลือกผู้ขับ --</option>
                                                {formData && formData.drivers.map(driver => (
                                                    <option value={driver.id} key={driver.id}>
                                                        {driver.firstname} {driver.lastname}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formik.errors.driver_id && formik.touched.driver_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.driver_id}</span>
                                            )}
                                        </Col>
                                        <Col md={6}>
                                            <label htmlFor="">รถยนต์ :</label>
                                            <select
                                                name="vehicle_id"
                                                value={formik.values.vehicle_id}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            >
                                                <option value="">-- เลือกรถยนต์ --</option>
                                                {formData && formData.vehicles.map(vehicle => (
                                                    <option value={vehicle.id} key={vehicle.id}>
                                                        {vehicle.reg_no}
                                                    </option>
                                                ))}
                                            </select>
                                            {(formik.errors.vehicle_id && formik.touched.vehicle_id) && (
                                                <span className="text-red-500 text-sm">{formik.errors.vehicle_id}</span>
                                            )}
                                        </Col>
                                        <Col>
                                            <label htmlFor="">หมายเหตุ :</label>
                                            <textarea
                                                name="remark"
                                                value={formik.values.remark}
                                                onChange={formik.handleChange}
                                                className="form-control text-sm"
                                            ></textarea>
                                            {(formik.errors.remark && formik.touched.remark) && (
                                                <span className="text-red-500 text-sm">{formik.errors.remark}</span>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="flex justify-end gap-1">
                                    <button type="submit" className="btn btn-outline-primary btn-sm mr-1" onClick={() => {}}>บันทึก</button>
                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleCancel(formik)}>ยกเลิก</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default Assign