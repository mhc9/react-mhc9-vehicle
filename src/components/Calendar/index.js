import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin  from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import './Calendar.css'

const Calendar = ({ events=[], onEventClick }) => {
    const calendarRef = useRef(null);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            initialView="timeGridWeek"
            locale="th"
            ref={calendarRef}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            slotMinTime="07:00:00"
            slotMaxTime="24:00:00"
            initialEvents={events}
            eventClick={onEventClick}
            height={'auto'}
        />
    )
}

export default Calendar