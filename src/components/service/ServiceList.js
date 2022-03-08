import React, { useContext, useEffect, useState } from "react"


export const ServiceList = ({ services }) => {
        
    return (
        <article className="services">
            {
                services.map(s => {
                    return (
                    <section key={`service--${s.id}`} className="service">
                        <div className="service_name">{s.name}</div>
                        <div className="service_location">{s.location}</div>
                        <div className="service_type">{s.type}</div>
                        <div className="service_email">{s.email}</div>
                        <div className="service_phone">{s.phone}</div>
                        <div className="service_phone">{s.rating}</div>
                    </section>)
                })
            }
        </article>
    )
}