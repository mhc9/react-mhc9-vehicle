import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const Calendar = ({ events=[] }) => {
    const calendarRef = useRef(null);
    console.log(calendarRef.current);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale="th"
            ref={calendarRef}
            headerToolbar={false}
            initialEvents={events}
        />
    )
}

export default Calendar