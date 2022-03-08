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
   

    const createServices = (game) => {
        return fetch("http://localhost:8000/games", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(game)
        })
        .then(response => response.json()) //POST: the response is the object you created
        // .then(getGames)  works when the database is not large, otherwise not efficient
        .then((data) => {
            const newGames = [...games, data]
            // newGames.push(data)
            setGames(newGames)
        });
    };
      
    const deleteGame = (gameId) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(getGames)
    }

    return (
        <ServiceContext.Provider value={{ services, getServices, getServicesByFilters}} >
            { props.children }
        </ServiceContext.Provider>
    )
}