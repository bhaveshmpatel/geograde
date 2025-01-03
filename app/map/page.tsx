'use client'

import { useState } from 'react'
import Map from '@/components/Map'
import DetailsPanel from '@/components/DetailsPanel'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lon: number
    address: string
  } | undefined>()

  
  
  return (<div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">GeoGrade</Link>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/compare" className="hover:underline">Compare</Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore Area Livability</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Map onLocationSelect={(lat, lon, address) => setSelectedLocation({ lat, lon, address })} />
          </div>
          <div className="w-full lg:w-1/3">
            <DetailsPanel location={selectedLocation} />
          
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Area Livability Scorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
