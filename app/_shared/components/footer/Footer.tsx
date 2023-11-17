export default function Footer() {
    return (
        <div className="w-full flex flex-col items-center bg-white py-2.5 border-t border-gray-200 dark:border-gray-700 dark:bg-raisedBackground sm:px-4 rounded">
            <div className="flex justify-center text-center text-xs">
                <p className="text-sm font-muted text-black dark:text-white">
                    Made with <span className="text-pink-500">&#9829;</span> by Toby Simone
                    <br />
                    Tempo &copy; 2023
                </p>
            </div>
        </div>
    )
}