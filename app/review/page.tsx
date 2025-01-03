'use client'; // Ensure this is marked for client-side rendering

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import Link from 'next/link';

// Define checkboxes options (Good and Bad things about the city)
const goodThingsOptions = [
  'Good Infrastructure',
  'Clean Streets',
  'Plenty of Green Spaces',
  'Good Healthcare Facilities',
  'Public Transport System',
  'Low Crime Rate',
  'Cultural Diversity',
  'Good Educational Institutions',
  'Friendly People',
  'Tourist Attractions',
  'Affordable Housing',
  'Low Pollution',
  'Safe for Children',
  'Nightlife and Entertainment',
  'Great Weather'
];

const badThingsOptions = [
  'High Cost of Living',
  'Traffic Congestion',
  'Poor Air Quality',
  'Limited Job Opportunities',
  'High Crime Rate',
  'Expensive Public Transport',
  'Lack of Parking Spaces',
  'Poor Healthcare Services',
  'Noisy Environment',
  'Limited Green Spaces',
  'Unstable Economy',
  'Poor Infrastructure',
  'Lack of Public Safety',
  'Lack of Cultural Activities',
  'Poor Educational Facilities'
];

const Review = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(z.object({})), // Empty schema as we're just dealing with checkboxes
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log('Review Submitted:', data);
    setIsLoading(false);
  };

  return (
    <>

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
            
          

    <section className="w-full mt-20 mb-36 max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <header className="flex flex-col gap-5 md:gap-8 p-3">
        <h1 className="text-2xl font-semibold text-center text-black">Tell Us About Your City</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Good Things About Your City Card */}
        <div className="border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Good Things About Your City</h2>
          <div className="grid grid-cols-2 gap-4">
            {goodThingsOptions.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`goodThings.${option}`)}
                  className="mr-2"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Bad Things About Your City Card */}
        <div className="border p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Bad Things About Your City</h2>
          <div className="grid grid-cols-2 gap-4">
            {badThingsOptions.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  {...register(`badThings.${option}`)}
                  className="mr-2"
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Input for Good and Underrated Things */}
        <div className="mt-8">
          <label className="block text-lg font-medium text-gray-700">Good and Underrated Things About Your Area/City</label>
          <textarea
            {...register('goodAndUnderrated')}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            placeholder="Write something good or underrated about your area/city"
            rows={4}
          />
        </div>

        {/* Input for Fun Fact */}
        <div className="mt-8">
          <label className="block text-lg font-medium text-gray-700">Fun Fact About Your Area/City</label>
          <textarea
            {...register('funFact')}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            placeholder="Share a fun fact about your area/city"
            rows={4}
          />
        </div>

        <div className="flex justify-center pb-3">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </section>
    </div>
    </>
  );
};

export default Review;
