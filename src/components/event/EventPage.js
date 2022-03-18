import React, { useState, useContext, useEffect} from "react"
import moment from "moment";
import { EventContext } from "./EventProvider.js";
import { EventList } from "./EventList"
import img from "./wellbeing.jpg"
import "./EventPage.css"
import { EventForm } from "./EventForm"
import { ProfileContext } from "../profile/ProfileProvider.js";

export const EventPage = () => {
    const { events, getEvents, getEventsByCategory, joinEvent, leaveEvent } = useContext(EventContext)
    const { profile, getProfile } = useContext(ProfileContext)
    const [ showInput , setShowInput ] = useState(false)
    const [ category ] = useState([
        {
         id: 1,
         label: "Body Movement"
        },
        {
         id: 2,
         label: "Support Group"
        },
        {
         id: 3,
         label: "Therapy Group"
        }
    ])

    useEffect(() => {
        getProfile()
    }, [events])

    const Swal = require('sweetalert2')

    return (
        <div className="event_container">
            <div className="drop-shadow"></div>
            
            <div className="event_banner">
                <div className="intro">
                    <h1>Mental Health Events</h1>
                    <p>Millions of American’s lives are impacted daily by mental health conditions. 
                       Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.
                       Participating in a local or national mental health event is a great way to help increase understanding of the complexity of mental illness. 
                       Through these events, we can expel myths, educate the public and show support for the many people affected by mental health conditions.
                    </p>
                </div>
                <img src={img} className="event_banner_img"/>
            </div>

            <div className="drop-shadow"></div>

            {
                category.map(c => {
                return (
                    <section className="event_section" key={c.id}>
                        <h2>{c.label}</h2>
                        <div className="event_cards">
                            {<EventList 
                                category={c.label} 
                                getEventsByCategory={getEventsByCategory}
                                joinEvent={joinEvent}
                                leaveEvent={leaveEvent} 
                                showInput={showInput}
                            />}
                        </div>
                    </section>
                )})
            }

            <div className="event_section">
                <h2 className="event_category">My Events</h2>
                <div className="event_cards">
                    {
                        profile.signedUpEvents?.length?
                        profile.signedUpEvents?.map(e => {
                            return (
                                <div className="event_card" key={e.id}>
                                    <img src={e.imageUrl} className="event_img" />
                                    <div>
                                        <p>{e.name}</p>
                                        <p>{moment(e.time.toString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    </div>
                                    <div className="event_signup">
                                        <p>{e.location}</p>
                                        <button className="signup_btn" onClick={() => {
                                            Swal.fire({
                                                title: 'Sorry to see you leave!',
                                                confirmButtonText: 'OK'
                                            })
                                            leaveEvent(e.id).then(() => {
                                                getEvents()
                                                getEventsByCategory()
                                            })
                                        }}>
                                        Leave
                                        </button>
                                    </div>
                                </div>
                            )
                        }) : <h3 className="no_event">You haven't signed up any events yet.</h3>
                    }
                </div>
            </div>
            

            { profile.user?.isStaff?
                <button className="event_create" onClick={() => setShowInput(!showInput)}>
                Create New Event
                </button>
            : null }

            { showInput? <EventForm setShowInput={setShowInput} /> : null }
        </div>
    )
}


