import Link from 'next/link';
import SignUpMessage from '../_components/SignUpMessage';

export default function ArtistSignUp() {
    return (
        <div className="mt-5 flex-1 w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href="/"
                className="absolute left-8 top-16 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{' '}
                Back
            </Link>

            <form
                className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                action="/auth/sign-up/artist"
                method="post"
            >
                <label className="text-md" htmlFor="email">
                    Email
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="email"
                    placeholder="you@example.com"
                    required
                />
                <label className="text-md" htmlFor="username">
                    Artist/Band Name
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="artist-name"
                    placeholder="Artist/Band"
                    required
                />
                <label className="text-md" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />
                <button className="border border-gray-700 rounded px-4 py-2 text-black dark:text-black mb-2">
                    Sign Up
                </button>
                <SignUpMessage />
            </form>
        </div>
    )
}