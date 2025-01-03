'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'


interface AreaDetails {
  literacyRate: number
  gdp: number
  crimeRate: number
  forestCover: number
  nearbyHospitals: number
  nearbyParks: number
  nearbyPoliceStations: number
}

interface DetailsPanelProps {
  location?: {
    lat: number
    lon: number
    address: string
  }
}

export default function DetailsPanel({ location }: DetailsPanelProps) {
  const [areaDetails, setAreaDetails] = useState<AreaDetails | null>(null)
  const [livabilityScore, setLivabilityScore] = useState<number | null>(null)

  useEffect(() => {
    if (location) {
      const mockData: AreaDetails = {
        literacyRate: Math.random() * 100,
        gdp: Math.random() * 100000,
        crimeRate: Math.random() * 10,
        forestCover: Math.random() * 100,
        nearbyHospitals: Math.floor(Math.random() * 10),
        nearbyParks: Math.floor(Math.random() * 20),
        nearbyPoliceStations: Math.floor(Math.random() * 5)
      }

      setAreaDetails(mockData)

      const score = (
        mockData.literacyRate * 0.2 +
        (mockData.gdp / 1000) * 0.2 +
        (10 - mockData.crimeRate) * 10 * 0.2 +
        mockData.forestCover * 0.1 +
        mockData.nearbyHospitals * 5 +
        mockData.nearbyParks * 2 +
        mockData.nearbyPoliceStations * 5
      ) / 10

      setLivabilityScore(Math.min(100, Math.max(0, score)))
    }
  }, [location])

  if (!location || !areaDetails) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Select an area on the map to view details
          </p>
        </CardContent>
      </Card>
    )
  }

  return (

    <Card className="w-full sm:w-2/3 lg:w-full xl:w-[200%]">
      <CardHeader>
        <CardTitle>Area Details</CardTitle>
        <p className="text-sm text-muted-foreground">{location.address}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Grid for 20 parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Example for the first two parameters */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Literacy Rate</span>
              <span>{areaDetails.literacyRate.toFixed(1)}%</span>
            </div>
            <Progress value={areaDetails.literacyRate} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>GDP (per capita)</span>
              <span>${areaDetails.gdp.toFixed(2)}</span>
            </div>
            <Progress value={(areaDetails.gdp / 100000) * 100} />
          </div>

          {/* Continue adding more parameters */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Forest Cover</span>
              <span>{areaDetails.forestCover.toFixed(1)}%</span>
            </div>
            <Progress value={areaDetails.forestCover} />
          </div>

          {/* Add the remaining parameters here */}
          {Array.from({ length: 16 }).map((_, index) => (
            <div className="space-y-2" key={index}>
              <div className="flex justify-between text-sm">
                <span>Parameter {index + 5}</span>
                <span>{areaDetails[`param${index + 5}`]}</span>
              </div>
              <Progress value={areaDetails[`param${index + 5}`]} />
            </div>
          ))}
        </div>

        {/* Grid for the summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{areaDetails.nearbyHospitals}</div>
            <div className="text-xs text-muted-foreground">Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{areaDetails.nearbyParks}</div>
            <div className="text-xs text-muted-foreground">Parks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{areaDetails.nearbyPoliceStations}</div>
            <div className="text-xs text-muted-foreground">Police Stations</div>
          </div>
        </div>

        {livabilityScore !== null && (
          <div className="pt-6">
            <h3 className="text-lg font-semibold mb-2">Livability Score</h3>
            <div className="space-y-2">
              <Progress value={livabilityScore} className="h-4" />
              <div className="text-2xl font-bold text-center">
                {livabilityScore.toFixed(1)}/100
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Buttons at the bottom */}
      <div className="flex justify-between pt-6">
        <Link href="/" passHref>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Home
          </button>
        </Link>
        <Link href="/detail-report" passHref>
          <button className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700">
            Detail Report
          </button>
        </Link>
        <Link href="/compare" passHref>
          <button className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700">
            Compare
          </button>
        </Link>
      </div>
    </Card>





  )
}
