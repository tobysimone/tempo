import SignUpMessage from '../_components/SignUpMessage';
import { Button } from 'flowbite-react';

export default function FanSignUp() {
    return (
        <div className="mt-5 flex flex-col w-full sm:max-w-xl self-center gap-2 px-8">
            <form
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action="/auth/sign-up/fan"
                method="post"
            >
                <h1 className="text-2xl font-bold text-black dark:text-white">Fan Sign Up</h1>

                <label className="text-md mt-5" htmlFor="email">
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