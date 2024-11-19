import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useGetInitialFormDataQuery } from '../../features/services/reservationApi'
import { update } from '../../features/slices/assignmentSlice'

const assignSchema = Yup.object().shape({
    driver_id: Yup.string().required('กรุณาเลือกผู้ขับรถก่อน'),
    vehicle_id: Yup.string().required('กรุณาเลือกรถก่อน'),
});

const ChangeDriver = ({ isShow, hide, date, data }) => {
    const dispatch = useDispatch();
    const { data: formData } = useGetInitialFormDataQuery({ date });

    const setDefaultVehicles = (formik, driverId) => {
        const newVehicles = formData && formData.vehicles.filter(vehicle => vehicle.driver_id === parseInt(driverId, 10));

        if (newVehicles.length > 0) {
            formik.setFieldValue('vehicle_id', newVehicles[0].id);
        }
    };

    const handleSubmit = (values, formik) => {
        if (window.confirm("คุณต้องการเปลี่ยนผู้ขับใช่หรือไม่?")) {
            dispatch(update({ id: data.id, data: values }));
            hide();
        }
    };

    return (
        <Modal show={isShow} onHide={hide}>
            <Modal.Header closeButton className="py-1">
                <Modal.Title>เปลี่ยนผู้ขับ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    enableReinitialize
                    initialValues={{
                        assignment_id: data ? data.id : '',
                        reservation_id: data ? data.reservation_id : '',
                        driver_id: data ? data.driver_id : '',
                        vehicle_id: data ? data.vehicle_id : '',
                        remark: (data && data.remark) ? data.remark : '',
                    }}
                    validationSchema={assignSchema}
                    onSubmit={handleSubmit}
                >
                    {(formik) => {
                        return (
                            <Row>
                                <Col md={12}>
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
                                <Col md={12}>
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
                                <Col md={12}>
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
                                <Col md={12} className="pt-2 flex justify-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm mr-1"
                                        onClick={formik.submitForm}
                                        disabled={formik.isSubmitting}
                                    >
                                        เปลี่ยน
                                    </button>
                                </Col>
                            </Row>
                        )
                    }}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default ChangeDriver