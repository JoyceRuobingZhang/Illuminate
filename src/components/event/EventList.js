import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "./EventProvider.js";
import "./EventList.css"

// event card list component
export const EventList = ({category}) => {
  const { getEventsByCategory, joinEvent, leaveEvent } = useContext(EventContext)

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
                        <p>{new Date(e.time).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                            })}
                        </p>
                        <div className="event_signup">
                            <p>{e.location}</p>
                            {e.joined ? (
                                <button
                                className="signup_btn"
                                onClick={() => leaveEvent(e.id).then(() => getEventsByCategory(category).then((data) => setCategorizedEvents(data)))}
                                >
                                Leave
                                </button>
                            ) : (
                                <button className="signup_btn" 
                                onClick={() => joinEvent(e.id).then(() => getEventsByCategory(category).then((data) => setCategorizedEvents(data)))}>
                                Join
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