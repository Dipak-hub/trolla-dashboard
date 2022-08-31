import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getConfirmedTrips } from '../../store/slice/confirmed-trips-slice';

function GodEye() {
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getConfirmedTrips())
    },[])

    const{confirmed_trips}=useSelector((state)=>state.confirmed_trips)
       
           console.log(confirmed_trips[4].load.delivery)
    
      
    const containerStyle = {
        width: "100vw",
        height: "100vh",
      };
      
  return (
    <div className="content-wrapper">
    <LoadScript googleMapsApiKey={"AIzaSyCAIrcBdbk8pRpi3bbYtk77PZ5wHVdeReo"}>
      <GoogleMap
        zoom={6}
         center={confirmed_trips[7].load.delivery}
        mapContainerStyle={containerStyle}
      >
        {
            confirmed_trips.map((e)=>{
                return(
                    <>
                    <Marker
                    icon={{
                      url:require("../../assets/images/truck.png"),
                      scaledSize: new window.google.maps.Size(35,45)
                    }}
                    position={e.load.delivery}/>
                    </>
                )
            })
        }
      
     
        
      </GoogleMap>
    </LoadScript>
  </div>
  )
}

export default GodEye