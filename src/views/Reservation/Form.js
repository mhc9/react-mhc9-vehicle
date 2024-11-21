import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { store, update } from '../../features/slices/reservationSlice'
import { useStyles } from '../../hooks/useStyles'
import MapSelection from '../../components/MapSelection'

const reservationSchema = Yup.object().shape({
    reserve_date: Yup.string().required(),
    reserve_time: Yup.string().required(),
    type_id: Yup.string().required(),
    contact_name: Yup.string().required(),
    contact_tel: Yup.string().required(),
    destination: Yup.string().required(),
    coordinate: Yup.string().required(),
    passengers: Yup.number().min(1).required(),
    vehicles: Yup.number().min(1).required(),
});

const ReservationForm = ({ reservation }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedTime, setSelectedTime] = useState(moment());
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        if (reservation) {
            setSelectedDate(moment(reservation.reserve_date));
            setSelectedTime(moment(`${reservation.reserve_date} ${reservation.reserve_time}`));
        }
    }, [reservation]);

    const handleSubmit = (data, fomrik) => {
        if (reservation) {
            if (window.confirm('คุณต้องการบันทึกการแก้ไขจองรถใช่หรือไม่?')) {
                dispatch(update({ id: reservation.id, data }));
            }
        } else {
            dispatch(store(data));
        }
    };

    return (
        <Formik
            initialValues={{
                reserve_date: reservation ? reservation.reserve_date : moment().format('YYYY-MM-DD'),
                reserve_time: reservation ? reservation.reserve_time : '',
                type_id: reservation ? reservation.type_id : '',
                contact_name: reservation ? reservation.contact_name : '',
                contact_tel: reservation ? reservation.contact_tel : '',
                destination: reservation ? reservation.destination : '',
                coordinate: reservation ? reservation.coordinate : '',
                passengers: reservation ? reservation.passengers : 1,
                vehicles: reservation ? reservation.vehicles : 1,
                remark: (reservation && reservation.remark) ? reservation.remark : ''
            }}
            validationSchema={reservationSchema}
            onSubmit={handleSubmit}
        >
            {(formik) => {
                return (
                    <Form>
                        <MapSelection
                            isShow={showMap}
                            hide={() => setShowMap(false)}
                            onSelect={(coordinate) => {
                                // formik.setFieldValue("destination", '');
                                formik.setFieldValue("coordinate", `${coordinate.lat}, ${coordinate.lng}`);
                            }}
                        />

                        <Row>
                            <Col md={12} className="mb-2">
                                <div className="flex flex-col">
                                    <label htmlFor="">วันที่ต้องการใช้</label>
                                    <DatePicker
                                        format="DD/MM/YYYY"
                                        value={selectedDate}
                                        onChange={(date) => {
                                            setSelectedDate(date);
                                            formik.setFieldValue('reserve_date', date.format('YYYY-MM-DD'));
                                        }}
                                        className={classes.muiTextFieldInput}
                                    />
                                    {(formik.errors.reserve_date && formik.touched.reserve_date) && (
                                        <span className="text-red-500 text-sm">{formik.errors.reserve_date}</span>
                                    )}
                                </div>
                            </Col>
                            <Col md={12} className="mb-2">
                                <div className="flex flex-col">
                                    <label htmlFor="">เวลาต้องการใช้</label>
                                    <TimePicker
                                        format="HH:mm"
                                        ampm={false}
                                        value={selectedTime}
                                        onChange={(time) => {
                                            const dateStr = moment(selectedDate).format('YYYY-MM-DD');
                                            const timeStr = moment(time).format('HH:mm');

                                            /** Create newTime from selectedDate and selected time from input */
                                            const newTaskTime = moment(`${dateStr}T${timeStr}`);

                                            /** Set newTime to selectedTime state and task_time field */
                                            setSelectedTime(newTaskTime);
                                            formik.setFieldValue('reserve_time', newTaskTime.format('HH:mm'));
                                        }}
                                        className={classes.muiTextFieldInput}
                                    />
                                    {(formik.errors.reserve_time && formik.touched.reserve_time) && (
                                        <span className="text-red-500 text-sm">{formik.errors.reserve_time}</span>
                                    )}
                                </div>
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">ผู้จอง</label>
                                <input
                                    type="text"
                                    name="contact_name"
                                    value={formik.values.contact_name}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.contact_name && formik.touched.contact_name) && (
                                    <span className="text-red-500 text-sm">{formik.errors.contact_name}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">เบอร์ติดต่อผู้จอง</label>
                                <input
                                    type="text"
                                    name="contact_tel"
                                    value={formik.values.contact_tel}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.contact_tel && formik.touched.contact_tel) && (
                                    <span className="text-red-500 text-sm">{formik.errors.contact_tel}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">ประเภทงาน</label>
                                <select
                                    name="type_id"
                                    value={formik.values.type_id}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                >
                                    <option value="">-- เลือกประเภท --</option>
                                    <option value="1">รับ</option>
                                    <option value="2">ส่ง</option>
                                    <option value="3">รับ-ส่ง</option>
                                </select>
                                {(formik.errors.type_id && formik.touched.type_id) && (
                                    <span className="text-red-500 text-sm">{formik.errors.type_id}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">สถานที่ (ระบุชื่อสถานที่)</label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formik.values.destination}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.destination && formik.touched.destination) && (
                                    <span className="text-red-500 text-sm">{formik.errors.destination}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="" className="flex items-center gap-1">Location <FaMapMarkedAlt /></label>
                                <div className="input-group">
                                    <div
                                        name="coordinate"
                                        className="flex items-center form-control text-xs min-h-[34px] bg-gray-100"
                                    >
                                        {formik.values.coordinate}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => setShowMap(true)}
                                    >
                                        ค้นหา
                                    </button>
                                </div>
                                {(formik.errors.coordinate && formik.touched.coordinate) && (
                                    <span className="text-red-500 text-sm">{formik.errors.coordinate}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">จำนวนผู้โดยสาร</label>
                                <input
                                    type="number"
                                    name="passengers"
                                    value={formik.values.passengers}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.passengers && formik.touched.passengers) && (
                                    <span className="text-red-500 text-sm">{formik.errors.passengers}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">จำนวนรถ</label>
                                <input
                                    type="number"
                                    name="vehicles"
                                    value={formik.values.vehicles}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                />
                                {(formik.errors.vehicles && formik.touched.vehicles) && (
                                    <span className="text-red-500 text-sm">{formik.errors.vehicles}</span>
                                )}
                            </Col>
                            <Col md={12} className="mb-2">
                                <label htmlFor="">หมายเหตุ</label>
                                <textarea
                                    rows="2"
                                    name="remark"
                                    value={formik.values.remark}
                                    onChange={formik.handleChange}
                                    className="form-control text-sm"
                                ></textarea>
                            </Col>
                        </Row>
                        
                        <Row className="px-[13px]">
                            <button type="submit" className="btn btn-dark">
                                {reservation ? 'แก้ไขจองรถ' : 'จองรถ'}
                            </button>
                        </Row>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ReservationForm