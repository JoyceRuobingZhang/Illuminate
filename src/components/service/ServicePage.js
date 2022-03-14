import React, { useState, useContext, useEffect, useRef} from "react"
import { Loader } from '@googlemaps/js-api-loader';
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
    
    // build google map
    const loader = new Loader({
    apiKey: "AIzaSyA_J8EGYYasRJrRtRBAe4Iur2WSHTjGiVE",
    version: "weekly",
    libraries: ["places"]
    });

    const mapOptions = {
        center: {
            lat: 36.174465,
            lng: -86.767960
        },
        zoom: 4
    };

    const mapMaker = async () => {
        try {
          const google = await loader.load()
          const map = await new google.maps.Map(
            document.getElementById("map"),
            mapOptions
          )
          console.log("map loaded")
          return map
        } catch (error) {
          console.log(error)
        }
      }
      
      const markerMaker = async (pos, map) => {
        try {
          const google = await loader.load()
          const marker = new google.maps.Marker({
            position: pos,
            setMap: map,
            title: "test",
          })
          console.log("marker loaded")
          return marker
        } catch (error) {
          console.log(error)
        }
      }

      // render map
      const GoogleMap = () => {
        const [map, setMap] = useState(null)
      
        useEffect(() => {
            mapMaker().then(map => setMap(map))
        }, [])
      
        useEffect(() => {
            if (map !== null) { // check for the initial value
              markerMaker({ lat: 36.174465, lng: -86.7679606 }, map)
            }
          }, [map])
      
        return <div className="google_map" id="map" style={{ height: '100vh', width: '100%' }}></div>
      }

      
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

                <GoogleMap />
            </div>
        </div>

    )
}