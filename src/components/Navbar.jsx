import { useEffect, useState } from "react";
import { classNs } from "@/lib/utils";
import { Contact, FolderKanban, HomeIcon, Menu, User, Wrench, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
    {name: "Home", href: "#hero", svgLogo: <HomeIcon/> },
    {name: "About", href: "#about", svgLogo: <User/> },
    {name: "Skills", href: "#skills", svgLogo: <Wrench/> },
    {name: "Projects", href: "#projects", svgLogo: <FolderKanban/> },
    {name: "Contact", href: "#contact", svgLogo: <Contact/> },    
];

export const Navbar = ({ isDarkMode, toggleTheme }) => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);         // for mobile menu

    // check if they have scrolled more than height=10
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Stop scroll while mobile menu is OPEN
    useEffect(() => {
        isMenuOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
        return () => document.body.style.overflow = "";     // cleanup
    }, [isMenuOpen]);

    return (
        <nav className={classNs(
            "fixed w-full z-40 transition-all duration-300",
            isScrolled ? "py-3 shadow-xs bg-background/70 backdrop-blur-md" : "py-5"
            )}>
            <div className="container flex items-center justify-between">
                <a href="#hero" className="text-xl font-bold text-primary flex items-center">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground">My</span>{" "}
                        Portfolio
                    </span>
                </a>
                {/* Desktop Navbar */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item, key) => (
                        <a 
                            key={key} href={ item.href } 
                            className="text-foreground/80 hover:text-primary flex gap-3 transition-colors duration-300">
                            <span>{ item.svgLogo }</span>
                            <span>{ item.name }</span>
                        </a>
                    ))}
                    <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
                </div>
                {/* Mobile Navbar */}
                <button 
                    onClick={ () => setIsMenuOpen((prev) => !prev) }
                    className="md:hidden p-2 text-foreground flex gap-3 z-50"
                    aria-label={ isMenuOpen ? "Close Menu" : "Open Menu" }
                    >
                    <span>Menu</span>
                    <span>
                        { isMenuOpen 
                            ? <X size={24}/>
                            : <Menu size={24}/>
                        }
                    </span>
                </button>
                <div className={classNs(
                    "fixed inset-0 h-screen bg-background/85 backdrop-blur-md z-40",
                    "flex flex-col items-center justify-center transition-all duration-300 md:hidden",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    )}>
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item, key) => (
                            <a 
                                key={key} 
                                href={ item.href }
                                onClick={ () => setIsMenuOpen(false) }
                                className="text-foreground/80 hover:text-primary flex gap-3 transition-colors duration-300">
                                <span>{ item.svgLogo }</span>
                                <span>{ item.name }</span>
                            </a>
                        ))}
                        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};