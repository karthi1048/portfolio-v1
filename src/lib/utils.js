import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This function will use "Tailwind merge" to combine class names, without writing lot of lines of tailwind class names in a single line.
export const classNs = (...inputs) => {
    return twMerge(clsx(inputs));
}

// We can use this function to pass a "list of class names" instead of "one huge string of classes".