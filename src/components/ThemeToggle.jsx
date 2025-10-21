import { Moon, Sun } from "lucide-react";

export const ThemeToggle = ({ isDarkMode, toggleTheme }) => {

    return (
        <button 
                onClick={ toggleTheme }
                aria-label={ isDarkMode ? "Light Mode" : "Dark Mode" }
                className={"transition-colors duration-300 flex gap-3 cursor-pointer focus:outline-hidden"}
            >
                <span>
                    { isDarkMode 
                        ? <Sun className="h-6 w-6 text-yellow-500"/> 
                        : <Moon className="h-6 w-6 text-blue-500"/> 
                    }
                </span>
                <span className="text-foreground/80">Mode</span>
        </button>
    )
}