import React, { useEffect, useState, useContext } from "react";
import { ProfileContext } from "../profile/ProfileProvider";
import { PostList } from "./PostList";
import "./PostPage.css"

export const PostPage = () => {

    const { profile, getProfile } = useContext(ProfileContext)

    useEffect(() => {
        getProfile()
    },[])

    return (
        <div className="post_page">
            <div className="me">
                <img src={profile.profileImg || 'https://cdn-icons-png.flaticon.com/512/374/374980.png'} 
                alt="my profile image" className="profile_img" />
            </div>

            <PostList />

            <div className="create">
               
            </div>

        </div>
    )
}