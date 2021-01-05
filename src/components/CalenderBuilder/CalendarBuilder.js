import "./CalendarBuilder.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import ActionBar from "./ActionBar/ActionBar";

const localizer = momentLocalizer(moment);

function CalendarBuilder() {
  const [events, setEvents] = useState(
    localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [{}]
  );
  const [eventSelected, setSelectedEvent] = useState(null);

  const handleSlotSelect = ({ start, end, action }) => {
    if (action === "doubleClick" || action === "select") {
      const title = window.prompt("New Event name");
      if (title) {
        var newEvent = {
          start: start,
          end: start === end ? end : end.setDate(end.getDate() + 1),
          title: title,
          allDay: true,
        };
        setEvents([...events, newEvent]);
        localStorage.setItem("events", JSON.stringify([...events, newEvent]));
      }
    }
  };
  return (
    <div className="calendarBuilder">
      <Calendar
        events={events}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable={true}
        onSelectSlot={handleSlotSelect}
        onSelectEvent={(e) => {
          setSelectedEvent(e);
        }}
      />
      <ActionBar
        setEvents={setEvents}
        events={events}
        eventSelected={eventSelected}
      />
    </div>
  );
}

export default CalendarBuilder;
