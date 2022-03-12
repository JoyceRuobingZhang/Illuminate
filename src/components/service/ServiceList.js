import React from "react"
import icon from './health.png'
import star from "./star.svg";
import emptyStar from "./empty-star.svg";
import "./ServiceList.css"

export const ServiceList = ({ services }) => {

    const renderStars = (rating) => {
        return [...Array(rating)].map(s => <img src={star}  />)
    }
    const renderEmptyStars = (rating) => {
        return [...Array( 5 - rating)].map(s => <img src={emptyStar} />)
    }
        
    return (
        <article className="services">
            {
                services.map(s => {
                    return (
                        <section key={`service--${s.id}`} className="service">
                            <div className="service_main">
                                <img src={icon} className="service_icon" />

                                <div className="service_infos"> 
                                    <h3 className="service_name">{s.name}</h3>
                                    <i>{s.location}</i>
                                    <h4> {s.type}</h4>
                                    <div className="service_email"><i>Email:&nbsp; </i>{s.email}</div>
                                    <div className="service_phone"><i>Phone:&nbsp;</i>{s.phone}</div>
                                
                                    <div className="service_rating">
                                        <div className="stars">
                                            {renderStars(parseInt(s.rating))}
                                            {renderEmptyStars(parseInt(s.rating))}
                                        </div>
                                        <div className="rating_number">{parseFloat(s.rating).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="service_tags">
                                {s.online ? <div className="tag">Online</div> : null}
                                {s.slidingScale ? <div className="tag"> Sliding Scale</div> : null}
                            </div>
                        </section>
                    )
                })
            }
        </article>
    )
}