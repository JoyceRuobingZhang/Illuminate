import React, { useState } from "react"
export const CategoryContext = React.createContext()

export const CategoriesProvider = (props) => {
    const [categories, setCategories] = useState([])
   

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            method: "GET",
            headers: {
                "Authorization": `Token ${localStorage.getItem("illuminate_token")}`
            }
        })
            .then(res => res.json())
            .then(setCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getCategories
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}