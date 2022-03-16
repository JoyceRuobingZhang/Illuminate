import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { EventList } from "./EventList"
import img from "./wellbeing.jpg"
import "./EventPage.css"
import { EventForm } from "./EventForm"

export const EventPage = () => {
    const [ showInput , setShowInput ] = useState(false)

    const [category, setCategory ] = useState([
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
                            {<EventList category={c.label} />}
                        </div>
                    </section>
                )})
            }

            <button className="event_create" onClick={() => setShowInput(!showInput)}>
                Create New Event
            </button>

            {
                showInput? 
                <EventForm setShowInput={setShowInput} category={category} setCategory={setCategory} /> 
                : null
            }
        </div>
    )
}

