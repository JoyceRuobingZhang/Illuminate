import React, { useState } from "react"

export const PostContext = React.createContext()

export const PostProvider = (props) => {
    const [ posts, setPosts ] = useState([])

    const getPosts = () => {
        return fetch("http://localhost:8000/posts", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
            }
        })
            .then(response => response.json())
            .then(setPosts)
    }

    // const getPostsByFilters = (queryParams) => {
    //     return fetch(`http://localhost:8000/Posts?${queryParams}`, {
    //         method: "GET",
    //         headers:{
    //             "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(setPosts)
    // }
   

    // const createPosts = (game) => {
    //     return fetch("http://localhost:8000/games", {
    //         method: "POST",
    //         headers:{
    //             "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(game)
    //     })
    //     .then(response => response.json()) //POST: the response is the object you created
    //     // .then(getGames)  works when the database is not large, otherwise not efficient
    //     .then((data) => {
    //         const newGames = [...games, data]
    //         // newGames.push(data)
    //         setGames(newGames)
    //     });
    // };
      
    // const deleteGame = (gameId) => {
    //     return fetch(`http://localhost:8000/games/${gameId}`, {
    //         method:"DELETE",
    //         headers:{
    //             "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(getGames)
    // }

    return (
        <PostContext.Provider value={{ posts, getPosts}} >
            { props.children }
        </PostContext.Provider>
    )
}