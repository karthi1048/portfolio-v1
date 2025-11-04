import { useEffect, useState } from "react";
import { AboutMe } from "../components/AboutMe"
import { ContactSection } from "../components/ContactSection"
import { FooterSection } from "../components/FooterSection"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { ProjectsSection } from "../components/ProjectsSection"
import { SkillsSection } from "../components/SkillsSection"
import { StarBackground } from "../components/StarBackground"

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);         // default = light mode

    // Initial theme check on page load
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        // Check User's preference for dark mode
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const useDark =  storedTheme === "dark" || ( !storedTheme && prefersDark );

        if (useDark) {
            document.documentElement.classList.add("dark");
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDarkMode(false);
        }
    }, []);

    // Toggles theme & stores it
    const toggleTheme = () => {
        const newIsDark = !isDarkMode;                          // Flips mode
        setIsDarkMode(newIsDark);

        if (newIsDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background effects rendered only in dark mode*/}
            { isDarkMode && <StarBackground/> }
            <header>
                <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
            </header>
            <main>
                <HeroSection/>
                <AboutMe/>
                <SkillsSection/>
                <ProjectsSection/>
                <ContactSection/>
            </main>
            <FooterSection/>
        </div>
    )
}