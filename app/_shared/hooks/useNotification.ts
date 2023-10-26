import { useContext } from "react";
import { NotificationContext } from "../providers/NotificationProvider";

export default function useNotification() {
    const { notification, addNotification, removeNotification } = useContext(NotificationContext);
    return {
        notification,
        addNotification,
        removeNotification
    }
}