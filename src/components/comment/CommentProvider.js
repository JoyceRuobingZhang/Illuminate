import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    /*
            Must Comment a default value for the `events` property so that React doesn't throw an error when you try to
            iterate the events array in the view.
        */
    const [comments, setComment] = useState();

    const getComments = () => {
        return fetch("http://localhost:8000/comments", {
        headers: {
            Authorization: `Token ${localStorage.getItem("illuminate_token")}`,
        },
        })
        .then((response) => response.json())
        .then(setComment);
    };

    return (
        <CommentContext.Provider value={{ comments, getComments }}>
        {props.children}
        </CommentContext.Provider>
    );
};