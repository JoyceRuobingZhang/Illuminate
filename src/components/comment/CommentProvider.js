import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    /*
            Must Comment a default value for the `events` property so that React doesn't throw an error when you try to
            iterate the events array in the view.
        */
    const [comments, setComments] = useState();

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
        headers: {
            Authorization: `Token ${localStorage.getItem("illuminate_token")}`,
        },
        })
        .then((response) => response.json())
        .then(setComments);
    }

    const createComment = (comment) => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
        .then(response => response.json()) //with comment method, the response is the object you created
     // .then(getComments)  works when the database is not large, otherwise not efficient
        .then((data) => {
            const newComment = [...comments, data]
            setComments(newComment)
        })
    }

    return (
        <CommentContext.Provider value={{ comments, getComments, createComment }}>
        {props.children}
        </CommentContext.Provider>
    )
}