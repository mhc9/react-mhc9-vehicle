import { DatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useStyles } from '../../hooks/useStyles'
import { generateQueryString } from '../../utils'

const FilteringInputs = ({ initialFilters, onFilter }) => {
    const classes = useStyles();
    const [filters, setFilters] = useState(initialFilters);

    return (
        <div className="border rounded-md py-2 px-3 mb-2">
            <Row>
                <Col md={4}>
                    <div className="flex max-md:flex-col items-center max-md:items-start">
                        <label htmlFor="วันที่ขอใช้" className="w-[35%] md:w-[50%] max-md:w-[100%]">วันที่ขอใช้ :</label>
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={filters.date}
                            onChange={(date) => {
                                const newFilters = { ...filters, date: date.format('YYYY-MM-DD') };
                                setFilters(newFilters);
                                onFilter(generateQueryString(newFilters));
                            }}
                            className={classes.muiTextFieldInput}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default FilteringInputs