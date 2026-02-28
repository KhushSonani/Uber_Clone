import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"

const LocationMarker = ({ position }) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, 15)
    }
  }, [position, map])

  if (!position) return null

  return (
    <Marker position={position}>
      <Popup>You are here 📍</Popup>
    </Marker>
  )
}

const MapView = () => {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude])
      },
      (err) => {
        console.log("Location error:", err)
      }
    )
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      <MapContainer
        center={[23.0225, 72.5714]} // fallback location
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker position={position} />
      </MapContainer>

      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  )
}

export default MapView