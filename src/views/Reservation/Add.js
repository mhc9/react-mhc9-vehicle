import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Row, Col } from 'react-bootstrap'
import { DatePicker, TimePicker } from '@material-ui/pickers'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik'
import moment from 'moment'
import { store, resetSuccess } from '../../features/slices/reservationSlice'
import { useStyles } from '../../hooks/useStyles'
import MapSelection from '../../components/MapSelection'

const AddReservation = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector(state => state.reservation);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [selectedTime, setSelectedTime] = useState(moment());
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            toast.success('บันทึกสำเร็จ!!');
            dispatch(resetSuccess());
            navigate('/');
        }
    }, [isSuccess]);

    const handleSubmit = (data, fomrik) => {
        dispatch(store(data));
    };

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                <Breadcrumb.Item active>จองรถ</Breadcrumb.Item>
            </Breadcrumb>

            <h3 className="font-bold text-lg mb-2">จองรถ</h3>

            <div>
                <Formik
                    initialValues={{
                        reserve_date: moment().format('YYYY-MM-DD'),
                        reserve_time: moment().format('HH:mm:ss'),
                        type_id: '',
                        contact_name: '',
                        contact_tel: '',
                        destination: '',
                        coordinate: '',
                        passengers: 1,
                        remark: ''
                    }}
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
                                        formik.setFieldValue("coordinate", coordinate);
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
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">ผู้จอง</label>
                                        <input
                                            type="text"
                                            name="contact_name"
                                            value={formik.values.contact_name}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">เบอร์ติดต่อผู้จอง</label>
                                        <input
                                            type="text"
                                            name="contact_tel"
                                            value={formik.values.contact_tel}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">ประเภทงาน</label>
                                        <select
                                            name="contact_tel"
                                            value={formik.values.contact_tel}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        >
                                            <option value="">-- เลือกประเภท --</option>
                                            <option value="1">รับ</option>
                                            <option value="2">ส่ง</option>
                                            <option value="3">รับ-ส่ง</option>
                                        </select>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">จุดหมาย</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={formik.values.destination}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">Location</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                name="coordinate"
                                                value={formik.values.coordinate}
                                                onChange={formik.handleChange}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => setShowMap(true)}
                                            >
                                                ค้นหา
                                            </button>
                                        </div>
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">จำนวนผู้โดยสาร</label>
                                        <input
                                            type="number"
                                            min={1}
                                            name="passengers"
                                            value={formik.values.passengers}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={12} className="mb-2">
                                        <label htmlFor="">หมายเหตุ</label>
                                        <textarea
                                            rows="2"
                                            name="remark"
                                            value={formik.values.remark}
                                            onChange={formik.handleChange}
                                            className="form-control"
                                        ></textarea>
                                    </Col>
                                </Row>

                                <button type="submit" className="btn btn-primary">
                                    จองรถ
                                </button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default AddReservation