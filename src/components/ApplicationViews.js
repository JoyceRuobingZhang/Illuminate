import React from "react"
import { Route } from "react-router-dom"
import { GameProvider } from "./game/GameProvider"
import { GameList } from "./game/GameList"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { GameForm } from "./game/GameForm"
import { EventForm } from "./event/EventForm"
import { ProfileProvider } from "./auth/ProfileProvider"
import { Profile } from "./auth/Profile"

import { Home } from "./home/Home"


export const ApplicationViews = () => {
    return <>
        <main 
        // style={{
        //     margin: "3rem 3rem",
        //     // backgroundColor: "lightgoldenrodyellow"
        // }}
        >
            <GameProvider>
                <EventProvider>
                    <ProfileProvider>

                        <Route exact path="/">
                            <Home />
                        </Route>
                    
                        <Route exact path="/games">
                            <GameList />
                        </Route>
                        
                        <Route exact path="/games/new">
                            <GameForm />
                        </Route>

                        <Route exact path="/games/edit/:gameId(\d+)">
                            <GameForm />
                        </Route>
                
                        <Route exact path="/events">
                            <EventList />
                        </Route>

                        <Route exact path="/events/new">
                            <EventForm />
                        </Route>

                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </ProfileProvider>
                </EventProvider>
            </GameProvider>
            
        </main>
    </>
}
