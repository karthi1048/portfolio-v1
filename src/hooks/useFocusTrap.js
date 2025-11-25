import { useEffect } from "react";

export default function useFocusTrap(isActive, containerRef) {
    useEffect(() => {
        // Guard to check if element is used or ref has DOM node
        if(!isActive || !containerRef.current) return;

        const node = containerRef.current;
        const focusableSelectors = 'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])';
        const focusable = node.querySelectorAll(focusableSelectors);

        if(focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        firstElement.focus();                 // Autofocus first element

        function handleTrap(e) {
            if (e.key !== "Tab") return;

            // Shift + Tab (go reverse) & at first, then go to last
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
                return;
            }

            // (go forward) if at last, go to first
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }

        node.addEventListener("keydown", handleTrap);
        return () => node.removeEventListener("keydown", handleTrap);
    }, [isActive, containerRef]);
}