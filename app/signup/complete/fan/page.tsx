export default function completeFanSignUp() {
    return (
        <div className="flex flex-1 flex-col w-full px-8 sm:max-w-md justify-center text-center gap-2">
            Complete Sign Up
            <form
                className="flex flex-1 flex-col w-full justify-center gap-2 text-foreground"
                action="/auth/flow/complete/fan"
                method="post"
            >
                <label className="text-md" htmlFor="username">
                    Username
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    name="username"
                    placeholder="Username"
                    required
                />
                <div className="flex flex-row mb-2">
                    <input
                        type="checkbox"
                        name="terms-and-conditions"
                        className="mr-2"
                        required
                    />
                    <label className="text-md" htmlFor="terms-and-conditions">
                        I have read and accept the terms of use
                    </label>
                </div>
                <button className={`bg-green-700 rounded px-4 py-2 text-white mb-2`}>
                    Complete Sign Up
                </button>
            </form>
        </div>
    )
}