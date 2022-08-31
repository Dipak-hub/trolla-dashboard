import { Marker } from '@react-google-maps/api'
import React from 'react'

function Origin({position}) {
  console.log(position)
  return (
    <Marker position={position} />
  )
}

export default Origin