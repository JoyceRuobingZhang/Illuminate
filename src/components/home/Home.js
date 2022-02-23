import React from "react"
import "./Home.css"
import tree from "./tree.jpg"
import sprout from "./sprout.jpg"
import quote1 from "./quote1.jpg"
import quote2 from "./quote2.jpg"
import quote3 from "./quote3.jpg"


export const Home = () => {
    return (
        <div className="home_container">
            {/* top can be a scroll */}
            <div className="home_top">
                <div className="text_top_container">
                    <div className="text_top">
                        <span className="large_text">“Recovery</span> is not one and done. <br/>
                        It is a 
                        <span className="large_text"> lifelong </span> 
                        journey that takes place 
                        <span className="large_text"> one </span> day, 
                        <span className="large_text"> one </span> step at a time.
                        <span className="large_text">”</span>
                    </div>
                    <div className="text_bottom">
                        Take your time healing, as long as you want. Nobody else knows what you’ve been through. 
                        How could they know how long it will take to heal you?
                    </div>
                </div>
                <img src={tree} alt="tree scenery" className="img_top"/>
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
        </div>
    )
}