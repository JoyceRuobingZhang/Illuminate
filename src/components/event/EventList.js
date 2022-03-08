import React, { useContext, useEffect } from "react";
import { EventContext } from "./EventProvider.js";
import "./EventList.css"

// event card list component
export const EventList = ({category}) => {
  const {events, getEventsByCategory} = useContext(EventContext)

  useEffect(() => {
      getEventsByCategory(category)
  }, [])

  return (
      <>
      {
          events.map(e => {
              return (
                  <div className="event_card" key={e.id}>
                      <img src={e.imageUrl} className="event_img" />
                      <div>
                        <p>{e.name}</p>
                        <p>{e.time}</p>
                        <p>{e.location}</p>
                      </div>
                  </div>
              )
          })
      }
      </>
  )
}