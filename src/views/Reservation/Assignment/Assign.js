import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useGetInitialFormDataQuery } from '../../../features/services/reservationApi'

const assignSchema = Yup.object().shape({
    driver_id: Yup.string().required('กรุณาเลือกผู้ขับรถก่อน'),
    vehicle_id: Yup.string().required('กรุณาเลือกรถก่อน'),
});

const Assign = ({ reservation, onSubmit }) => {
    const { data: formData, isLoading } = useGetInitialFormDataQuery();

    const setDefaultVehicles = (formik, driverId) => {
        const newVehicles = formData && formData.vehicles.filter(vehicle => vehicle.driver_id === parseInt(driverId, 10));

        if (newVehicles.length > 0) {
            formik.setFieldValue('vehicle_id', newVehicles[0].id);
        }
    };

    const handleSubmit = (data, formik) => {
        onSubmit(data);
    };

    return (
        <div className="mb-2">
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
                        <Row>
                            <Col md={3} className="pr-1">
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
                                            {driver.nickname} ({driver.member_of?.short_name})
                                        </option>
                                    ))}
                                </select>
                                {(formik.errors.driver_id && formik.touched.driver_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.driver_id}</span>
                                )}
                            </Col>
                            <Col md={3} className="px-1">
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
                                            {vehicle.type?.name} {vehicle.reg_no} ({vehicle.owner?.short_name})
                                        </option>
                                    ))}
                                </select>
                                {(formik.errors.vehicle_id && formik.touched.vehicle_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.vehicle_id}</span>
                                )}
                            </Col>
                            <Col md={5} className="px-1">
                                <label htmlFor="">หมายเหตุ :</label>
                                <textarea
                                    rows={1}
                                    name="remark"
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                ></textarea>
                                {(formik.errors.remark && formik.touched.remark) && (
                                    <span className="text-red-500 text-sm">{formik.errors.remark}</span>
                                )}
                            </Col>
                            <Col md={1} className="pl-1 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm mr-1"
                                    onClick={formik.submitForm}
                                    disabled={formik.isSubmitting}
                                >
                                    เพิ่ม
                                </button>
                            </Col>
                        </Row>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Assign