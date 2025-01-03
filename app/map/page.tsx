'use client'

import { useState } from 'react'
import Map from '@/components/Map'
import DetailsPanel from '@/components/DetailsPanel'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number
    lon: number
    address: string
  } | undefined>()

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
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
        <h1 className="text-3xl font-bold mb-8">Explore Area Quality</h1>

        <div className="grid grid-cols-5 gap-8 lg:gap-8">
          <div className="col-span-4">
            <Map onLocationSelect={(lat, lon, address) => setSelectedLocation({ lat, lon, address })} />
          </div>

          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <p className="font-bold text-sm ">
                  Select the type of user from the dropdown below.
                </p>
              </CardHeader>
              <div className="p-2">
                <label htmlFor="user-type" className="block text-sm font-medium text-gray-700">
                </label>
                <select
                  id="user-type"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue="general"
                  onChange={(e) => console.log(`Selected User Type: ${e.target.value}`)}
                >
                  <option value="general">General User</option>
                  <option value="student">Student</option>
                  <option value="working">Working Professional</option>
                  <option value="family">Family-Oriented Individuals</option>
                  <option value="real">Real Estate Investors</option>
                  <option value="environmentally">Environmentally Conscious Individuals</option>
                  <option value="senior">Senior Citizens or Retirees</option>
                  <option value="tracellers">Travelers or Tourist</option>
                  <option value="retail">Retail or Business Owners</option>
                  <option value="public">Public Administrators or Policymakers</option>
                </select>
              </div>
            </Card>
          </div>

          <div className="w-full col-span-5">
            <DetailsPanel location={selectedLocation} />
          </div>
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 text-center">
        </div>
      </footer>
    </div>
  )
}
