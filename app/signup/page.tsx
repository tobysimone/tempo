'use client'

import { Button } from 'flowbite-react';
import Link from 'next/link';

export default function SignUp() {
    return (
        <div className="mt-5 flex flex-1 flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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