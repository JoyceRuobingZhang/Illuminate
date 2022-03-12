import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"
import mind from "./img/mind.jpg"
import quote1 from "./img/quote1.jpg"
import quote2 from "./img/quote2.jpg"
import quote3 from "./img/quote3.jpg"
import icon1 from "./img/icon1.png"
import icon2 from "./img/icon2.png"
import icon3 from "./img/icon3.png"
import sticker1 from "./img/sticker1.png"
import sticker2 from "./img/sticker2.png"
import sticker3 from "./img/sticker3.png"
import events from "./img/events.png"
import services from "./img/services.jpg"
import social from "./img/social.jpg"



export const Home = () => {
    return (
        <div className="home_container">
            {/* top can be a scroll?? */}
            <div className="home_top">
                <div className="text_top_container">
                    <p className="text_top">
                        <span className="large_text">“Recovery</span> is not one and done. <br/>
                        It is a 
                        <span className="large_text"> lifelong </span> 
                        journey that takes place 
                        <span className="large_text"> one </span> day, 
                        <span className="large_text"> one </span> step at a time.
                        <span className="large_text">”</span>
                    </p>
                    <p className="text_bottom">
                        Take your time healing, as long as you want. Nobody else knows what you’ve been through. 
                        How could they know how long it will take to heal you?
                    </p>
                </div>
                <img src={mind} alt="mind art" className="img_top"/>
            </div>

            <div className="home_cards">
                <div className="home_card">
                    <img src={quote1} alt="quote" className="img_card"/>
                </div>
                <div className="home_card">
                    <img src={quote3} alt="quote" className="img_card"/>
                </div>
                <div className="home_card">
                    <img src={quote2 } alt="quote" className="img_card"/>
                </div>
            </div>

            <div className="home_data_set">
                <div className="home_data">
                    <img src={icon1} alt="icon" className="icon_card"/>
                    <p>52.9 million</p>
                    <p>Nearly one in five U.S. adults live with a mental illness</p>
                </div>
                <div className="home_data">
                    <img src={icon2} alt="icon" className="icon_card"/>
                    <p>31.1%</p>
                    <p>U.S. adults experience an anxiety disorder at some time in their lives</p>
                </div>
                <div className="home_data">
                    <img src={icon3 } alt="icon" className="icon_card"/>
                    <p>21.0 million</p>
                    <p>U.S. adults had at least one major depressive episode</p>
                </div>
            </div>

            <p className="home_text">But there is 
                <span className="large_text"> HOPE</span>. 
            </p>

            <div className="home_stickers">
                <div className="home_sticker">
                    <img src={sticker1} alt="sticker" className="img_sticker"/>
                </div>
                <div className="home_sticker">
                    <img src={sticker2} alt="quote" className="img_sticker"/>
                </div>
                <div className="home_sticker">
                    <img src={sticker3} alt="quote" className="img_sticker"/>
                </div>
            </div>

            <p className="home_text">and we are here to 
                <span className="large_text"> help</span>. 
            </p>

            <div className="home_supports">
                <div className="home_support">
                    <img src={events} alt="events" className="img_support"/>
                    <Link className="home_support_text" to="/events">Mental Health Events</Link>
                </div>
                <div className="home_support">
                    <img src={services} alt="services" className="img_support"/>
                    <Link className="home_support_text" to="/services">Mental Health Services</Link>
                </div>
                <div className="home_support">
                    <img src={social} alt="social media" className="img_support"/>
                    <Link className="home_support_text" to="/posts">Mental Health Online Community</Link>
                </div>
            </div>
        </div>
    )
}