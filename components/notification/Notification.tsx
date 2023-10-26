'use client'

import './styles.css';

import useNotification from "@/app/_shared/hooks/useNotification";
import { Toast } from "flowbite-react";
import { HiExclamation } from 'react-icons/hi';

export type NotificationType = 'normal' | 'error';

export interface NotificationProps {
    type: NotificationType,
    message: string
}

export default function Notification() {
    const { notification, removeNotification } = useNotification();

    if (notification) {
        return (
            <Toast className="mt-5" id="notification">
                {notification?.type == 'error' && (
                    <div className="mr-3 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                        <HiExclamation className="h-5 w-5" />
                    </div>
                )}
                <div className="text-sm font-normal text-muted dark:text-muted">
                    {notification?.message}
                </div>
                <Toast.Toggle onDismiss={removeNotification} />
            </Toast>
        )
    }

    return <></>
}