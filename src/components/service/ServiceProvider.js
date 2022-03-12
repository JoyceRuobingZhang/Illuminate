import React, { useState } from "react"

export const ServiceContext = React.createContext()

export const ServiceProvider = (props) => {
    const [ services, setServices ] = useState([])

    const getServices = () => {
        return fetch("http://localhost:8000/services", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
            }
        })
            .then(response => response.json())
            .then(setServices)
    }

    const getServicesByFilters = (queryParams) => {
        return fetch(`http://localhost:8000/services?${queryParams}`, {
            method: "GET",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
            }
        })
        .then(response => response.json())
        .then(setServices)
    }

    return (
        <ServiceContext.Provider value={{ services, getServices, getServicesByFilters}} >
            { props.children }
        </ServiceContext.Provider>
    )
}