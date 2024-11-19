import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { getDriverAssignments } from '../../features/slices/driverSlice'
import Loading from '../../components/Loading'
import TypeBadge from '../../components/Badges/TypeBadge';

const DriverAssignmentList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { driver, isLoading } = useSelector(state => state.driver);
    const [selectedDate, setSelectedDate] = useState(moment());

    useEffect(() => {
        if (id) dispatch(getDriverAssignments({ id, date: selectedDate.format('YYYY-MM-DD') }));
    }, []);

    console.log(driver);


    return (
        <div>
            <div className="hidden min-[490px]:block">
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>หน้าหลัก</Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/driver" }}>คนขับ</Breadcrumb.Item>
                    <Breadcrumb.Item active>รายการขับรถ</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <h3 className="font-bold text-lg mb-2">รายการขับรถ</h3>

            <div className="border rounded-md py-2 px-3 mb-2">
                <Row>
                    <Col md={4} className="max-lg:pb-1">
                        <div className="flex max-md:flex-col items-center max-md:items-start">
                            <label htmlFor="วันที่ขอใช้" className="w-[35%] md:w-[50%] max-md:w-[100%]">วันที่ขอใช้ :</label>
                            <DatePicker
                                format="DD/MM/YYYY"
                                value={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    dispatch(getDriverAssignments({ id, date: date.format('YYYY-MM-DD') }))
                                }}
                            />
                        </div>
                    </Col>
                    <Col className="lg:text-center max-lg:mt-2">
                        <h3 className="text-lg font-bold">ผู้ขับ : {driver?.firstname} {driver?.lastname} ({driver?.member_of?.name})</h3>
                    </Col>
                </Row>
            </div>

            <div>
                <table className="table table-bordered table-hover mt-2">
                    <thead>
                        <tr>
                            <th className="text-center w-[5%]">#</th>
                            <th className="text-center w-[10%]">เวลา</th>
                            <th className="text-center w-[30%]">จุดหมาย</th>
                            <th className="text-center">หมายเหตุ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <tr><td className="text-center" colSpan={4}><Loading /></td></tr>}
                        {(!isLoading && driver) && driver?.assignments.map((assignment, index) => (
                            <tr key={assignment.id}>
                                <td className="text-center">{++index}</td>
                                <td className="text-center">
                                    {moment(`${assignment.reservation?.reserve_date} ${assignment.reservation?.reserve_time}`).format('HH:mm')} น.
                                </td>
                                <td className="text-left">
                                    <TypeBadge type={assignment.reservation?.type} />
                                    <span className="mx-1">{assignment.reservation?.type_id === 1 ? 'จาก' : 'ที่'}</span>
                                    <span className="">{assignment.reservation?.destination}</span>
                                </td>
                                <td>
                                    {assignment.reservation?.remark && (
                                        <span className="text-xs text-green-700 flex flex-row items-start gap-1">
                                            <span className="text-sm font-thin">{assignment.reservation?.remark}</span>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DriverAssignmentList