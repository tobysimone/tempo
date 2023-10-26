'use client'

import { NotificationProps, NotificationType } from "@/components/notification/Notification";
import React from "react";
import { useCallback, useState } from "react";

export const NotificationContext = React.createContext<{
    notification: NotificationProps | null | undefined,
    queue: NotificationProps[],
    addNotification: (message: string, type: NotificationType) => void, 
    removeNotification: () => void
}>({
    notification: null,
    queue: [],
    addNotification: (_message: string, _type: NotificationType) => {},
    removeNotification: () => {},
});

export default function NotificationProvider({ children }: any) {
    const [notification, setNotification] = useState<NotificationProps | null | undefined>(null);
    const [queue, setQueue] = useState<NotificationProps[]>([]);

    const removeNotification = () => {
        console.log(queue);
        setNotification(queue.pop());
        setQueue(queue);
        console.log(JSON.stringify(notification));
    }
    
    const addNotification = (message: string, type: NotificationType) => {
        console.log(message);
        if (queue.length == 0) {
            setNotification({ message, type });
        } else {
            queue.push({ message, type })
            setQueue(queue);
        }

        setTimeout(() => {
            removeNotification();
        }, 5000);
    }

    const contextValue = {
        notification,
        queue,
        addNotification: useCallback((message: string, type: NotificationType) => addNotification(message, type), []),
        removeNotification: useCallback(() => removeNotification(), [])
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    )
}