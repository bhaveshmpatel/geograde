'use client'; // Ensure this is marked for client-side rendering

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming Button is a reusable component
import CustomInput from '@/components/CustomInput'; // Custom Input component
import { authFormSchema } from '@/lib/utils'; // Ensure auth form schema is defined

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = authFormSchema('sign-in'); // Pass 'sign-in' for form schema

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // Handle your sign-in logic here (e.g., call your API)
    // Example: await signIn(data);
    setIsLoading(false);
    router.push('/'); // Redirect on successful sign-in
  };

  return (
    <>
    <section className="w-full mt-48 max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl border border-gray-200" >
      <header className="flex flex-col gap-5 md:gap-8">
        <h1 className="text-2xl font-semibold text-black">Sign In</h1>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <footer className="flex justify-center gap-1">
        <p className="text-sm font-normal text-gray-600">
          Don't have an account?
        </p>
        <a href="/sign-up" className="text-indigo-600 hover:text-indigo-800">
          Sign Up
        </a>
      </footer>
    </section>
    <div className='pb-40'></div>
    </>
  );
};

export default SignIn;
