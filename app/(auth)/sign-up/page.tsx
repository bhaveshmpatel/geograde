'use client'; // Ensure this is marked for client-side rendering

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming Button is a reusable component
import CustomInput from '@/components/CustomInput'; // Custom Input component
import { authFormSchema } from '@/lib/utils'; // Ensure auth form schema is defined

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema('sign-up'); // Pass 'sign-up' for form schema

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    
    // Log the form data for debugging purposes
    console.log('SignUp Form Submitted', data);
    
    // Here you can call your API to submit the data or handle sign up logic
    // Example: await signUp(data);
    
    setIsLoading(false);
    router.push('/dashboard'); // Redirect on successful sign-up
  };

  return (
    <>
      <section className="w-full mt-36 mb-36 max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200">
        <header className="flex flex-col gap-5 md:gap-8 p-3">
          <h1 className="text-2xl font-semibold flex justify-center text-black">Sign Up</h1>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4">
            <CustomInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="John"
              error={errors.firstName}
            />
            <CustomInput
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              error={errors.lastName}
            />
          </div>

          <CustomInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            error={errors.email}
          />
          <CustomInput
            control={control}
            name="password"
            label="Password"
            placeholder="********"
            error={errors.password}
          />

          <div className="flex justify-center pb-3">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        <footer className="flex justify-center gap-1">
          <p className="text-sm font-normal text-gray-600">
            Already have an account?
          </p>
          <a href="/sign-in" className="text-indigo-600 hover:text-indigo-800">
            Sign In
          </a>
        </footer>
      </section>
      <div className="pb-8"></div>
    </>
  );
};

export default SignUp;
