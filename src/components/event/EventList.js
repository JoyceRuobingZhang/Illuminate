import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Swal from 'sweetalert2'
import "./EventList.css"

// event card list component
export const EventList = ({category, getEventsByCategory, getEvents, joinEvent, leaveEvent, showInput}) => {

  /* make a new references for events in this component; 
     instead of using 'events' in the context, because when they share the same context, they will overwrite each other */
  const [ categorizedEvents, setCategorizedEvents ] = useState([])

  useEffect(() => {
      getEventsByCategory(category).then((data) => setCategorizedEvents(data))
  }, [showInput])

  const Swal = require('sweetalert2')

  return (
      <>
      {
          categorizedEvents.map(e => {
              return (
                  <div className="event_card" key={e.id}>
                      <img src={e.imageUrl} className="event_img" />
                      <div>
                        <p>{e.name}</p>
                        <p>{moment(e.time.toString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <div className="event_signup">
                            <p>{e.location}</p>
                            {e.joined ? (
                                <button
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