import React from "react"
import { Route } from "react-router-dom"
import { EventProvider } from "./event/EventProvider"
import { Home } from "./home/Home"
import { ServiceProvider } from "./service/ServiceProvider"
import { ServicePage } from "./service/ServicePage"
import { EventPage } from "./event/EventPage"
import { CategoriesProvider } from "./category/CategoryProvider"
import { PostProvider } from "./post/PostProvider"
import { ProfileProvider } from "./profile/ProfileProvider"
import { PostPage } from "./post/PostPage"
import { CommentProvider } from "./comment/CommentProvider"


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
                        <PostProvider>
                            <ProfileProvider>
                                <CommentProvider>

                                <Route exact path="/">
                                    <Home />
                                </Route>
                            
                                <Route exact path="/services">
                                    <ServicePage props={defaultProps}/>
                                </Route>

                                <Route exact path="/events">
                                    <EventPage />
                                </Route>
                                
                                <Route exact path="/posts">
                                    <PostPage />
                                </Route>

                                {/* <Route exact path="/games/edit/:gameId(\d+)">
                                    <GameForm />
                                </Route> */}
                                
                                </CommentProvider>
                            </ProfileProvider>
                        </PostProvider>
                    </CategoriesProvider>
                </EventProvider>
            </ServiceProvider>
        </main>
    </>
}
