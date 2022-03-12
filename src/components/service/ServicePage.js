import React, { useState, useContext, useEffect, useRef} from "react"
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

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


    
    // render map with Google
    // const render = (status: Status) => {
    //     return <h1>{status}</h1>;
    // };

    // const ref = useRef(null);
    // const [map, setMap] = useState();
    const [zoom, setZoom] = useState(3); // initial zoom
    const [center, setCenter] = useState( {
        lat: 36.1627,
        lng: -86.7816
      });
    
    // // const google = window.google = window.google ? window.google : {}

    // useEffect(() => {
    // if (ref.current && !map) {
    //     setMap(new google.maps.Map(ref.current, {}));
    // }
    // }, [ref, map]);

    // const Map = () => {
    //     return <div ref={ref} style={{ height: '100vh', width: '100%' }}/>
    // }

   
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

           
            
            <div className="result_wrapper">
                <div className="services">
                    <ServiceList services={services}/>
                </div>

                {/* <GoogleApiWrapper apiKey='AIzaSyA_J8EGYYasRJrRtRBAe4Iur2WSHTjGiVE'>
                    <Map
                    // google={props.google}
                    zoom={8}
                    style={{ height: '100vh', width: '100%' }}
                    initialCenter={{ lat: 47.444, lng: -122.176}}
                    />
                </GoogleApiWrapper>         */}


                {/* npm package */}
                <div style={{ height: '100vh', width: '50%', margin: '32px' }}>
                    <GoogleMapReact
                        defaultCenter={center}
                        defaultZoom={zoom}
                        >
                        {/* <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        /> */}
                    </GoogleMapReact>
                </div>

            </div>
        </div>

    )
}