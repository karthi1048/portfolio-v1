import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {

    // Stop body scroll while modal is OPEN
    useEffect(() => {
        isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
        return () => document.body.style.overflow = "";                                     // cleanup
    }, [isOpen]);

    // If Esc is used for closing modal
    useEffect(() => {
        function handleKeyDown(e) {
            if (e.key === "Escape") onClose();
        }
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div onClick={onClose}
            className={`fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-hidden bg-background/50 backdrop-blur-md
                p-4 transition-all duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div onClick={(e) => e.stopPropagation()}
                className="relative rounded-2xl bg-background shadow-xl max-w-xl max-h-[90vh] overflow-y-auto w-full p-6">
                <button onClick={onClose}
                    className="absolute top-3 right-3 ml-auto p-1 rounded hover:bg-primary/50 transition z-20">
                    <X size={22} />
                </button>
                { children }
            </div>
        </div>
    )
}

// children prop depicts all the content (HTML, functions, child components, etc) inside for a particular element