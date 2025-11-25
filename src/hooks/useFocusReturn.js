import { useRef } from "react";

export default function useFocusReturn() {
    const previousFocusRef = useRef(null);

    // Stores the opener element(DOM) using ref
    const remember = (element) => previousFocusRef.current = element;

    // After usage, restores or sets it to be focused
    const restore = () => {
        if (previousFocusRef.current) {
            previousFocusRef.current.focus();
        }
    };

    return { remember, restore };
}