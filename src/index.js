import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Illuminate } from "./components/Illuminate"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Illuminate />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
