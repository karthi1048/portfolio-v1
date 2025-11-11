import { useEffect, useRef } from "react"

export default function useEventListener(eventType, callback, element = window) {
    const callbackRef = useRef(callback);

    // updating the callback to prevent additional re-renders
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handler = e => callbackRef.current(e);
        element.addEventListener(eventType, handler);

        return () => element.removeEventListener(eventType, handler);
    }, [eventType, element]);
}