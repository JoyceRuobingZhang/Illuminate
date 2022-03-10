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

    // const queryParams = Object.entries(filterState).map(keyVal => keyVal.join('=')).join('&')
    
    useEffect(() => {
        getServices()
    }, [])

    const serviceTypes = [
        {
         id: 1,
         label: "Hospital" 
        },
        {
         id: 2,
         label: "Private Practice"
        },
        {
         id: 3,
         label: "Residential Treatment Center"
        }
    ]

    const renderRadioButton = (arr) => {
        return (
            arr.map(st => {
                return (
                    <label for={st.label} key={st.id}>
                        <input type="radio" name="serviceType" value={st.label}
                        onChange={ e => setFilterState({...filterState, ['type']: e.target.value })} />
                        {st.label}
                    </label>
                )
            })
        )
    }

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
                    {renderRadioButton(serviceTypes)}
                </div>

                <ul className="other_filters">
                    <h3>Filter Further:</h3>
                    <li>
                        <input type="checkbox" name="online" value='online' onChange={ () => {
                            setFilterState({...filterState, ['isOnline']: (!filterState['isOnline'])})
                        }} />
                        Online
                    </li>
                    <li>
                        <input type="checkbox" name="slidingScale" value='slidingScale' onChange={() => {
                            setFilterState({...filterState, ['isSlidingScale']: (!filterState['isSlidingScale'])})
                        }} />
                        Sliding Scale
                    </li>
                </ul>

                <button className="service_search_submit" onClick={ e => {
                    e.preventDefault()
                    const queryParams = Object.entries(filterState).map(keyVal => keyVal.join('=')).join('&')
    
                    if(filterState.type !== '' || filterState.isOnline || filterState.isSlidingScale){
                        getServicesByFilters(queryParams)
                    } else { 
                        getServices()
                    }
                }}>
                    Submit
                </button>

                {/* clear is not working ???? */}
                {/* <button className="service_search_clear" onClick={e => {
                    e.preventDefault()
                    setFilterState({...filterState, ['type']: '' })
                }}>Clear</button> */}
            </div>

            <div className="services">
                <ServiceList services={services}/>
            </div>
        </div>

    )
}