import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./EventProvider.js";
import "./EventList.css"

// event card list component
<<<<<<< HEAD
export const EventList = ({category, getEventsByCategory, getEvents, joinEvent, leaveEvent, showInput}) => {
=======
export const EventList = ({category}) => {
  const { getEventsByCategory, joinEvent, leaveEvent } = useContext(EventContext)
>>>>>>> parent of e6ea06a (fixed the eventlist-rerender bug)

  /* make a new references for events in this component; 
     instead of using 'events' in the context, because when they share the same context, they will overwrite each other */
  const [ categorizedEvents, setCategorizedEvents ] = useState([])

  useEffect(() => {
      getEventsByCategory(category).then((data) => setCategorizedEvents(data))
  }, [])

  return (
      <>
      {
          categorizedEvents.map(e => {
              return (
                  <div className="event_card" key={e.id}>
                      <img src={e.imageUrl} className="event_img" />
                      <div>
                        <p>{e.name}</p>
<<<<<<< HEAD
                        <p>{moment(e.time.toString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
=======
                        <p>{new Date(e.time).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                            })}
                        </p>
>>>>>>> parent of e6ea06a (fixed the eventlist-rerender bug)
                        <div className="event_signup">
                            <p>{e.location}</p>
                            {e.joined ? (
                                <button
<<<<<<< HEAD
                                    className="signup_btn"
                                    onClick={() => {
                                        leaveEvent(e.id)
                                        .then(() => { 
                                            getEventsByCategory(category).then((data) => setCategorizedEvents(data))
                                            getEvents()
                                        })
                                        Swal.fire({
                                            title: 'Sorry to see you leave!',
                                            confirmButtonText: 'OK'
                                        })
                                    }}>
                                    Leave
                                </button>
                            ) : (
                                <button className="signup_btn" 
                                    onClick={() => {
                                        joinEvent(e.id)
                                        .then(() => {
                                            getEventsByCategory(category).then((data) => setCategorizedEvents(data))
                                            getEvents()
                                        })
                                        Swal.fire({
                                            title: 'Thank you for signing up!',
                                            confirmButtonText: 'OK'
                                        })
                                    }}>
                                    Join
=======
                                className="signup_btn"
                                onClick={() => leaveEvent(e.id).then(() => getEventsByCategory(category).then((data) => setCategorizedEvents(data)))}
                                >
                                Leave
                                </button>
                            ) : (
                                <button className="signup_btn" 
                                onClick={() => joinEvent(e.id).then(() => getEventsByCategory(category).then((data) => setCategorizedEvents(data)))}>
                                Join
>>>>>>> parent of e6ea06a (fixed the eventlist-rerender bug)
                                </button>
                            )}
                        </div>
                      </div>
                  </div>
              )
          })
      }
      </>
  )
}