import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [ posts, setPosts, unapproved, setUnapproved ] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
            }
        })
            .then(response => response.json())
            .then(setPosts)
    }

    const getUnapprovedPosts = () => {
        return fetch("http://localhost:8000/posts/unapproved", {
          method: "GET",
          headers: {
            "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
          }
        })
          .then(res => res.json())
          .then(setUnapproved)
    }

    const getMyFavoritePosts = () => {
        return fetch("http://localhost:8000/posts/favorites", {
          method: "GET",
          headers: {
            "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
          }
        })
          .then(res => res.json())
    }

    const createPost = (post) => {
        return fetch("http://localhost:8000/posts", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(response => response.json()) //with POST method, the response is the object you created
     // .then(getPosts)  works when the database is not large, otherwise not efficient
        .then((data) => {
            const newPosts = [...posts, data]
            setPosts(newPosts)
        })
    }

    const approvePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}/approve`, {
          method: "PUT",
          headers: {
              "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(getPosts)
    }

    const likePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}/like`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(getPosts)
    }   

    const unlikePost = post => {
        return fetch(`http://localhost:8000/posts/${post.id}/like`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
        .then(getPosts)
    }  
      
    const deletePost = (postId) => {
        return fetch(`http://localhost:8000/posts/${postId}`, {
            method:"DELETE",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(getPosts)
    }

    return (
        <PostContext.Provider value={
            {   posts, 
                getPosts, 
                unapproved, 
                getUnapprovedPosts, 
                createPost,
                approvePost, 
                likePost,
                unlikePost,
                getMyFavoritePosts,
                deletePost
            }
        } >
            { props.children }
        </PostContext.Provider>
    )
}