import SignUpMessage from '../_components/SignUpMessage';
import { Button } from 'flowbite-react';

export default function FanSignUp() {
    return (
        <div className="mt-5 flex page-container mx-auto sm:max-w-md gap-2 p-8">
            <h1 className="text-2xl font-bold text-black dark:text-white">Fan Sign Up</h1>
            <form
                className="mt-5 flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action="/auth/sign-up/fan"
                method="post"
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md mt-3" htmlFor="username">
                    Username
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit"
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                />
                <label className="text-md mt-3" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <Button className="mt-5">
                    Sign Up
                </Button>
                <SignUpMessage />
            </form>
        </div>
    )
}