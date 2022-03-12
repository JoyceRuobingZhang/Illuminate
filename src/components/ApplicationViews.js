import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

import { Home } from "./home/Home"
import { ServiceProvider } from "./service/ServiceProvider"
import { ServicePage } from "./service/ServicePage"
import { EventPage } from "./event/EventPage"
import { CategoriesProvider } from "./category/CategoryProvider"


export const ApplicationViews = () => {

    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
    }

    return <>
        <main 
        // style={{
        //     margin: "3rem 3rem",
        //     // backgroundColor: "lightgoldenrodyellow"
        // }}
        >
            <ServiceProvider>
            <EventProvider>
                <CategoriesProvider>

                <Route exact path="/">
                    <Home />
                </Route>
            
                <Route exact path="/services">
                    <ServicePage props={defaultProps}/>
                </Route>

                <Route exact path="/events">
                    <EventPage />
                </Route>
                
                <Route exact path="/games/new">
                    <GameForm />
                </Route>

                <Route exact path="/games/edit/:gameId(\d+)">
                    <GameForm />
                </Route>
        
                <Route exact path="/profile">
                    <Profile />
                </Route>

                </CategoriesProvider>
            </EventProvider>
            </ServiceProvider>
        </main>
    </>
}
