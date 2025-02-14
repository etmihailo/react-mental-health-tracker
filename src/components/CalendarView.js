import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import {DateTime} from 'luxon';
import '@fullcalendar/common/main.css';

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/logs');
                const logs = response.data.map(log => ({
                    id: log.id,
                    title: 'Daily Log',
                    start: DateTime.fromISO(log.date).toJSDate(),
                    end: DateTime.fromISO(log.date).toJSDate(),
                    extendedProps: log,
                }));
                setEvents(logs);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleSelectEvent = async (info) => {
        try {
            const response = await axios.get('http://localhost:5001/api/log-by-date', {
                params: {date: DateTime.fromJSDate(info.event.start).toISODate()},
            });
            navigate('/results', {state: {logData: response.data}});
        } catch (error) {
            console.error('Error fetching log by date:', error);
        }
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventClick={handleSelectEvent}
            />
        </div>
    );
};

export default CalendarView;
