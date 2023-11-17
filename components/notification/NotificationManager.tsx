import { Toaster } from "react-hot-toast";

export default function NotificationManager() {
    return <Toaster
        position="bottom-left"
        toastOptions={{
            duration: 55000,
            style: {
                padding: '16px',
                background: 'bg-background'
            }
        }}
    />
}