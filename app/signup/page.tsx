'use client'

import { Button } from 'flowbite-react';

export default function SignUp() {
    return (
        <div className="mt-5 flex flex-col w-full sm:max-w-md self-center gap-2 px-8">
            <h1 className="text-2xl font-bold text-black dark:text-white">Sign Up</h1>
            <Button href="/signup/fan" className="mt-5">
                Sign up as a fan
            </Button>
            <Button href="/signup/artist" className="mt-3">
                Sign up as an artist
            </Button>
            <Button href="/signup/label" className="mt-3">
                Sign up as a label
            </Button>
        </div>
    )
}