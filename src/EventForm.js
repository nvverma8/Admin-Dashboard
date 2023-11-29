import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventForm.css";

const EventForm = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [date, SetDate] = useState("");
  const [startTime, SetStartTime] = useState("");
  const [endTime, SetEndtTime] = useState("");
  const history = useNavigate();

  const handleCreateEvent = () => {
    // Navigate to the next page with captured values
    history(
      `/display?name=${eventName}&eventDis=${eventDescription}&date=${date}&start=${startTime}&etime=${endTime}`
    );
  };

  return (
    <div className="form">
      <div className="name">
        <label htmlFor="">Event Name</label>
        <input
          type="text"
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
          placeholder="Event Name"
        />
      </div>
      <div className="name">
        <label htmlFor="">Event description</label>
        <input
          type="text area"
          value={eventDescription}
          onChange={(event) => setEventDescription(event.target.value)}
          placeholder="Event Description"
        />
      </div>
      <div className="name">
        <label htmlFor="">Date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => SetDate(event.target.value)}
          placeholder=""
        />
      </div>
      <div className="name">
        <label htmlFor="">Start Time</label>
        <input
          type="time"
          value={startTime}
          onChange={(event) => SetStartTime(event.target.value)}
          placeholder="Email"
        />
      </div>
      <div className="name">
        <label htmlFor="">End time</label>
        <input
          type="time"
          value={endTime}
          onChange={(event) => SetEndtTime(event.target.value)}
          placeholder=""
        />
      </div>
      <div className="name">
      <button onClick={handleCreateEvent}>Create Event</button>
      </div>
    </div>
  );
};

export default EventForm;

