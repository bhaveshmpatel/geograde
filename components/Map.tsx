'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { OLA_MAPS_API_KEY } from '@/utils/ola-maps'
import { OlaMaps } from '@/OlaMapsWebSDK';

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
  let flag = 1
  useEffect(() => {
    if (flag > 1){
      return;
    }
    console.log("Component mounted"); // Debugging log
    console.log(flag)
    flag += 1
    if (mapRef.current) {
      const mapOptions = {
        style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
        container: mapRef.current,
        center: [77.61648476788898, 12.931423492103944],
        zoom: 12,
      };
      
      // Initialize the map
      mapInstance.current = olaMaps.init(mapOptions);
      
      // Check if the map instance is created
      if (mapInstance.current) {
        console.log("Map initialized successfully");
      } else {
        console.error("Failed to initialize map");
      }

      // Add event listeners
      

      // Add click event listener to the map
      const handleMapClick = (event: any) => {
        const { lng, lat } = event.lngLat; // Get the clicked coordinates
        console.log(`Clicked coordinates: ${lng}, ${lat}`); // Log the coordinates
        // Update marker position and add it to the map
        setMarker((prevMarker: any) => {
          if (prevMarker) {
            // Remove the previous marker if it exists
            prevMarker.remove();
          }
          if (marker) {
            marker.remove();
          }

          // Create a new marker
          const newMarker = olaMaps.addMarker({
            // offset: [0, 0], // Adjust offset as needed
            // anchor: [0, 0], // Adjust anchor position as needed
            color: 'red',
            draggable: true,
          })
          .setLngLat([lng, lat]) // Set the marker's position
          .addTo(mapInstance.current); // Add marker to the map

          // Return the new marker instance
          return newMarker;
        });

        // Calculate the score based on the clicked location
        onLocationSelect(lat, lng, '');
        calculateScore(lng, lat);
      };

      // Attach the click event listener
      mapInstance.current.on('click', handleMapClick);

      
    }
  }, []); // Empty dependency array to run only once

  const calculateScore = (lng: number, lat: number) => {
    // Implement your score calculation logic here
    console.log(`Calculating score for location: ${lat}, ${lng}`);
  }



  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-white shadow-lg">
      <div className="p-4 border-b">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search for a location"
            className="flex-1"
          />
          <Button onClick={() => { /* Implement search functionality */ }}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
      <div className="relative h-[calc(100%-73px)]">
        <div 
          ref={mapRef}
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

// Wrap the component with React.memo
export default React.memo(Map);

