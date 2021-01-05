import "./ActionBar.css";
import React from "react";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";

function ActionBar({ setEvents, events, eventSelected }) {
  const editEventTitle = (e) => {
    if (eventSelected) {
      const title = window.prompt("New Title");
      if (title) {
        const index = events.indexOf(eventSelected);
        let newArray = [...events];
        newArray[index].title = title;
        setEvents(newArray);
        localStorage.setItem("events", JSON.stringify(newArray));
      }
    }
  };
  const deleteEvent = (e) => {
    if (eventSelected) {
      const toDelete = window.confirm(
        `Delete the Event: ${eventSelected.title}?`
      );

      if (toDelete) {
        const index = events.indexOf(eventSelected);
        let newArray = [...events];
        newArray.splice(index, 1);
        setEvents(newArray);
        localStorage.setItem("events", JSON.stringify(newArray));
      }
    }
  };

  return (
    <div className="actionBar">
      <Tooltip title="Select Event">
        <Button variant="contained" color="primary" onClick={editEventTitle}>
          Edit Event Title
        </Button>
      </Tooltip>
      <Tooltip title="Select Event">
        <Button variant="contained" color="secondary" onClick={deleteEvent}>
          Delete Event
        </Button>
      </Tooltip>
    </div>
  );
}

export default ActionBar;
