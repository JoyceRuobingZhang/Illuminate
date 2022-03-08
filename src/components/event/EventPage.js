import React, { useState, useContext, useEffect } from "react"
import { EventList } from "./EventList"
import img from "./wellbeing.jpg"
import "./EventPage.css"

export const EventPage = () => {
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

            <section className="event_section">
                <h2>Body Movement</h2>
                <div className="event_cards">
                    {<EventList category="Body Movement" />}
                </div>
            </section>

            <section className="event_section">
                <h2>Support Group</h2>
                <div className="event_cards">
                    {<EventList category="Support Group" />}
                </div>
            </section>

            <section className="event_section">
                <h2>Therapy Group</h2>
                <div className="event_cards">
                    {<EventList category="Therapy Group" />}
                </div>
            </section>
        </div>
    )
}

