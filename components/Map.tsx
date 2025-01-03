import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OLA_MAPS_API_KEY } from '@/utils/ola-maps'
import { OlaMaps } from '@/OlaMapsWebSDK'

interface MapProps {
  onLocationSelect: (lat: number, lon: number, address: string) => void
}

const olaMaps = new OlaMaps({
  apiKey: OLA_MAPS_API_KEY || "",
})

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const [marker, setMarker] = useState<any>(null) // Store the marker instance
  const [searchQuery, setSearchQuery] = useState<string>("")

  useEffect(() => {
    if (mapRef.current) {
      const mapOptions = {
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: mapRef.current,
        center: [77.61648476788898, 12.931423492103944], // Default center (example)
        zoom: 12,
      }

      // Initialize the map
      mapInstance.current = olaMaps.init(mapOptions)

      // Add click event listener to the map
      const handleMapClick = (event: any) => {
        const { lng, lat } = event.lngLat // Get the clicked coordinates
        console.log(`Clicked coordinates: ${lng}, ${lat}`)
        setMarker((prevMarker: any) => {
          if (prevMarker) {
            prevMarker.remove() // Remove previous marker
          }

          const newMarker = olaMaps.addMarker({
            color: 'red',
            draggable: true,
          })
            .setLngLat([lng, lat])
            .addTo(mapInstance.current)

          return newMarker
        })

        onLocationSelect(lat, lng, '')
      }

      // Attach the click event listener
      mapInstance.current.on('click', handleMapClick)
    }
  }, []) // Empty dependency array to run only once

  const handleSearch = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(`https://api.olamaps.io/places/v1/geocode?address=${searchQuery}&api_key=${OLA_MAPS_API_KEY}`)

        // Check if the response is JSON
        if (response.ok) {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json()

            if (data && data.geocodingResults && data.geocodingResults.length > 0) {
              const { lat, lng } = data.geocodingResults[0].geometry.location
              const formattedAddress = data.geocodingResults[0].formatted_address

              // Center the map and place a marker
              mapInstance.current.setCenter([lng, lat])
              setMarker((prevMarker: any) => {
                if (prevMarker) {
                  prevMarker.remove()
                }
                const newMarker = olaMaps.addMarker({
                  color: 'blue',
                  draggable: false,
                })
                  .setLngLat([lng, lat])
                  .addTo(mapInstance.current)
                return newMarker
              })

              // Pass the selected location back to the parent
              onLocationSelect(lat, lng, formattedAddress)
            } else {
              console.error("No results found for the given search query.")
            }
          } else {
            console.error("Expected JSON, but received:", contentType)
          }
        } else {
          console.error("Failed to fetch data:", response.status, response.statusText)
        }
      } catch (error) {
        console.error("Error fetching location data:", error)
      }
    }
  }

  // Handle keypress event for 'Enter'
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px] 2xl:h-[1000px] rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search for a location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress} // Add keydown event for Enter key
            className="flex-1"
          />
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      <div className="relative h-[calc(100%-73px)]">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  )
}

export default React.memo(Map)
