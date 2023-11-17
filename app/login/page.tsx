'use client'

import LoginMessage from './LoginMessage';
import { useSearchParams } from 'next/navigation';

export default function Login() {
  const searchParams = useSearchParams();
  const signUpType = searchParams.get('type') ?? '';

  return (
    <div className="page-container mx-auto mt-5 sm:max-w-md gap-2 p-8">
      <h1 className="text-2xl font-bold text-black dark:text-white">Login</h1>
      <form
        className="mt-5 flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md mt-3" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        { !signUpType && 
          <button className="bg-green-700 rounded px-4 py-2 text-white mt-5">
            Sign In
          </button>
        }
        <button
          formAction="/auth/sign-up"
          className="border border-gray-700 rounded px-4 py-2 mt-3"
        >
          Sign Up
        </button>
        <input hidden value={signUpType} name="sign-up-type" />
        <LoginMessage />
      </form>
    </div>
  )
}
