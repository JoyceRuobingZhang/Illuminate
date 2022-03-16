import React, { useState, useContext, useEffect, useRef} from "react"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ServiceContext } from "./ServiceProvider"
import { ServiceList } from "./ServiceList"
import "./ServicePage.css"


export const ServicePage = ( ) => {
    const { services, getServices, getServicesByFilters }= useContext(ServiceContext)

    const [filterState, setFilterState] = useState({
        type: '',
        isOnline: false,
        isSlidingScale: false
    })
    
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
                    <label htmlFor={st.label} key={st.id}>
                        <input type="radio" name="serviceType" value={st.label}
                        onChange={ e => setFilterState({...filterState, ['type']: e.target.value })} />
                        {st.label}
                    </label>
                )
            })
        )
    }

    /* google map */
    const containerStyle = {
        width: '100%',
        height: '100vh',
        margin: '32px 0 0 32px'
    }
    
    const center = {
        lat: 36.174465,
        lng: -86.767960
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA_J8EGYYasRJrRtRBAe4Iur2WSHTjGiVE"
      })
    
    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])
    /* */

      
    // render service page
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

                <button className="submit" onClick={ e => {
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

                {/* <button className="service_search_clear" onClick={e => {
                    e.preventDefault()
                    setFilterState({...{
                        type: '',
                        isOnline: false,
                        isSlidingScale: false
                    }})
                }}>Clear</button> */}
            </div>

            <div className="result_wrapper">
                <div className="services">
                    <ServiceList services={services}/>
                </div>
                {
                    isLoaded ? (
                        <GoogleMap
                          mapContainerStyle={containerStyle}
                          center={center}
                          zoom={12}
                          onLoad={onLoad}
                          onUnmount={onUnmount}
                        >
                            {/* <Marker position={center} /> */}
                            {services.map(s => 
                                <Marker position={{lat: parseFloat(s.latitude), lng: parseFloat(s.longitude)}} 
                                 key={s.id} title={s.name} />
                            )}
                        </GoogleMap>
                    ) : <></>
                }
            </div>
        </div>

    )
}