import React, { useState, useContext, useEffect } from "react"
import { ServiceContext } from "./ServiceProvider"
import { ServiceList } from "./ServiceList"
import "./ServicePage.css"

export const ServicePage = () => {
    const { services, getServices, getServicesByFilters }= useContext(ServiceContext)

    const [filterState, setFilterState] = useState({
        type: '',
        isOnline: false,
        isSlidingScale: false
    })

    const queryParams = Object.entries(filterState).map(keyVal => keyVal.join('=')).join('&')
    
    useEffect(() => {
        if(filterState.type !=='' || filterState.isOnline || filterState.isSlidingScale){
            getServicesByFilters(queryParams)
        } 
        getServices()
    }, [filterState])


    return (
        <div className="service_container">
            <div className="drop-shadow"></div>
            <h2 className="service_title">
                Mental Health Professional Help <br/>
                <small>Your Story Matters</small>
            </h2>
            <div className="filters">
                <div className="type_filter">
                    <h3>Type:</h3>
                    <div>
                        <input type="radio" name="type" value="Hospital" onChange={(e) => {setFilterState({...filterState, ['type']: e.target.value})}} />
                        <span>Hospital</span>
                    </div>
                    <div>
                        <input type="radio" name="type" value="Private Practice" onChange={(e) => setFilterState({...filterState, ['type']: e.target.value})} />
                        <span>Private Practice</span>
                    </div>
                    <div>
                        <input type="radio" name="type" value="Residential Treatment Center" onChange={(e) => setFilterState({...filterState, ['type']: e.target.value})} />
                        <span>Residential Treatment Center</span>
                    </div>
                </div>

                <ul className="other_filters">
                    <h3>Filter Further:</h3>
                    <li>
                        <input type="checkbox" name="online" value='online' onChange={() => {
                            setFilterState({...filterState, ['isOnline']: (!filterState['isOnline'])})
                        }} />
                        Online
                    </li>
                    <li>
                        <input type="checkbox" name="slidingScale" value='slidingScale' onChange={(e) => {
                            setFilterState({...filterState, ['isSlidingScale']: e.target.value})
                        }} />
                        Sliding Scale
                    </li>
                </ul>
            </div>

            <div className="services">
                <ServiceList services={services}/>
            </div>
        </div>

    )
}