import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useGetInitialFormDataQuery } from '../../features/services/driverApi'
import { store, update } from '../../features/slices/driverSlice'

const driverSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    nickname: Yup.string().required(),
    tel: Yup.string().required(),
    owner_id: Yup.string().required(),
});

const DriverForm = ({ driver }) => {
    const dispatch = useDispatch();
    const { data: formData } = useGetInitialFormDataQuery();

    const handleSubmit = (data, formik) => {
        if (driver) {
            dispatch(update({ id: driver.id, data }));
        } else {
            dispatch(store(data));
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                firstname: driver ? driver.firstname : '',
                lastname: driver ? driver.lastname : '',
                nickname: driver ? driver.nickname : '',
                tel: driver ? driver.tel : '',
                owner_id: driver ? driver.owner_id : '',
                line_id: (driver && driver.line_id) ? driver.line_id : ''
            }}
            validationSchema={driverSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <Row>
                            <Col md={8} className="mb-2">
                                <label>ชื่อ-สกุล</label>
                                <div className="flex flex-row items-center gap-2">
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                        placeholder="ชื่อ"
                                    />
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        className="form-control"
                                        placeholder="สกุล"
                                    />
                                </div>
                                {((formik.errors.firstname || formik.errors.lastname) && (formik.touched.firstname || formik.touched.lastname)) && (
                                    <span className="text-red-500 text-sm">กรุณาระบุชื่อ-สกุลก่อน</span>
                                )}
                            </Col>
                            <Col md={4} className="mb-2">
                                <label>ชื่อเล่น</label>
                                <input
                                    type="text"
                                    name="nickname"
                                    value={formik.values.nickname}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                    placeholder="ชื่อเล่น"
                                />
                                {(formik.errors.nickname && formik.touched.nickname) && (
                                    <span className="text-red-500 text-sm">{formik.errors.nickname}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label>สังกัด</label>
                                <select
                                    type="text"
                                    name="owner_id"
                                    value={formik.values.owner_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                >
                                    <option value="">-- เลือก --</option>
                                    {formData && formData.owners.map(owner => (
                                        <option value={owner.id} key={owner.id}>
                                            {owner.name}
                                        </option>
                                    ))}
                                </select>
                                {(formik.errors.owner_id && formik.touched.owner_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.owner_id}</span>
                                )}
                            </Col>
                            <Col md={6} className="mb-2">
                                <label>โทรศัพท์</label>
                                <input
                                    type="text"
                                    name="tel"
                                    value={formik.values.tel}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                                {(formik.errors.tel && formik.touched.tel) && (
                                    <span className="text-red-500 text-sm">{formik.errors.tel}</span>
                                )}
                            </Col>
                            <Col md={6} className="mb-2">
                                <label>Line ID</label>
                                <input
                                    type="text"
                                    name="line_id"
                                    value={formik.values.line_id}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                                {(formik.errors.line_id && formik.touched.line_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.line_id}</span>
                                )}
                            </Col>
                            <Col md={12} className="flex justify-end">
                                <button type="submit" className={`btn ${driver ? 'btn-dark' : 'btn-primary'} btn-sm`}>
                                    {driver ? 'แก้ไข' : 'บันทึก'}
                                </button>
                            </Col>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default DriverForm