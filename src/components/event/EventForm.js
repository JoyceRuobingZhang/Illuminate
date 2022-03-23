import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import { EventContext } from "./EventProvider";
import { CategoryContext } from "../category/CategoryProvider"

export const EventForm = ({setShowInput, category}) => {
  const { createEvent } = useContext(EventContext)
  const { categories, getCategories }= useContext(CategoryContext)
  const [ currentEvent, setEvent ] = useState({
    image_url: "",
    name: "",
    time: "",
    date: "",
    location: "",
    host: "",
    categoryId: 0
  });

  useEffect(() => {
    getCategories()
  }, []);

  const handleControlledInputChange = (e) => {
    const newCurrentEvent = {...currentEvent }
    newCurrentEvent[e.target.name] = e.target.value
    setEvent(newCurrentEvent)
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Create New Event</h2>

      <fieldset>
        <div className="form-group">
          <label htmlFor="image_url">Image URL: </label>
          <input
            type="text"
            name="image_url"
            required
            autoFocus
            className="form-control"
            value={currentEvent.image_url}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            value={currentEvent.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={handleControlledInputChange}
          />
          <input
            type="time"
            name="time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            value={currentEvent.location}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="host">Host: </label>
          <input
            type="text"
            name="host"
            required
            autoFocus
            className="form-control"
            value={currentEvent.host}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="eventId">Category: </label>
          <select
            name="categoryId"
            className="form-control"
            value={currentEvent.categoryId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a category...</option>
            {categories.map((c) => (
              <option value={c.id} key={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
            evt.preventDefault();
            // merge the time and date input values, and format it as the way backend expects
            const dateTime = moment(`${currentEvent.date} ${currentEvent.time}`, 'YYYY-MM-DD HH:mm:ss').format();

            const newEvent = {
              image_url: currentEvent.image_url,
              name: currentEvent.name,
              time: dateTime,
              location: currentEvent.location,
              host: currentEvent.host,
              categoryId: parseInt(currentEvent.categoryId)
            }
            
            createEvent(newEvent).then(() => {
              setShowInput(false)
            })
        }}
        className="event_create"
      >
        Submit
      </button>
    </form>
  );
};