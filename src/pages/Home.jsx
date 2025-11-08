import { useEffect, useState, Suspense, lazy, useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { StarBackground } from "../components/StarBackground"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { FooterSection } from "../components/FooterSection"
// import ProjectsSection from "../components/ProjectsSection";
// import AboutMe from "../components/AboutMe"
// import SkillsSection from "../components/SkillsSection"
// import ContactSection from "../components/ContactSection"

// import("../components/ProjectsSection").then((mod) => {
//     console.log("Project section module keys: ", Object.keys(mod));
//     console.log("Default export type: ", typeof mod.default);
// });

// lazy imports for sections - resilient against double default exports
const AboutMe = lazy(async() => {
    const mod = await import("../components/AboutMe");
    // Handle double default wrapping safety
    return { default: mod.default || mod.AboutMe };
});

const SkillsSection = lazy(async() => {
    const mod = await import("../components/SkillsSection");
    // Handle double default wrapping safety
    return { default: mod.default || mod.SkillsSection };
});

const ProjectsSection = lazy(async() => {
    const mod = await import("../components/ProjectsSection");
    // Handle double default wrapping safety
    return { default: mod.default || mod.ProjectsSection };
});
const ContactSection = lazy(async() => {
    const mod = await import("../components/ContactSection");
    // Handle double default wrapping safety
    return { default: mod.default || mod.ContactSection };
});

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);         // default = light mode

    // Refs for each section
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    // Detect when user scrolls near the section
    const isNearAbout = useOnScreen(aboutRef, "-200px");
    const isNearSkills = useOnScreen(skillsRef, "-200px");
    const isNearProjects = useOnScreen(projectsRef, "-200px");
    const isNearContact = useOnScreen(contactRef, "-200px");

    // Persistent Flags
    const [hasLoadedAbout, setHasLoadedAbout] = useState(false);
    const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
    const [hasLoadedSkills, setHasLoadedSkills] = useState(false);
    const [hasLoadedContact, setHasLoadedContact] = useState(false);

    // preload each section when near viewport
    useEffect(() => {
        if (isNearAbout) {
            setHasLoadedAbout(true);
            import("../components/AboutMe");
        }
        if (isNearSkills) {
            setHasLoadedSkills(true);
            import("../components/SkillsSection");
        }
        if (isNearProjects) {
            setHasLoadedProjects(true);
            import("../components/ProjectsSection");
        }
        if (isNearContact) {
            setHasLoadedContact(true);
            import("../components/ContactSection");
        }
    }, [isNearAbout, isNearProjects, isNearSkills, isNearContact]);

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
            <main className="overflow-x-hidden">
                <HeroSection/>
                <section ref={aboutRef} id="about" className="py-24 px-4 relative">
                    <Suspense fallback={ <SectionLoader name="About" /> }>
                        { hasLoadedAbout ? <AboutMe /> : <Placeholder name="About" />}
                    </Suspense>
                </section>
                <section ref={skillsRef} id="skills" className="py-24 px-4 relative bg-secondary/30">
                    <Suspense fallback={ <SectionLoader name="Skills" /> }>
                        { hasLoadedSkills ? <SkillsSection /> : <Placeholder name="Skills" />}
                    </Suspense>
                </section>
                <section ref={projectsRef} id="projects" className="py-24 px-4 relative">
                    <Suspense fallback={ <SectionLoader name="Projects" /> }>
                        { hasLoadedProjects ? <ProjectsSection /> : <Placeholder name="Projects" />}
                    </Suspense>
                </section>
                <section ref={contactRef} id="contact" className="py-24 px-4 relative bg-secondary/30">
                    {/* <ContactSection/> */}
                    <Suspense fallback={ <SectionLoader name="Contact Form" /> }>
                        { hasLoadedContact ? <ContactSection /> : <Placeholder name="Contact" />}
                    </Suspense>
                </section>
            </main>
            <FooterSection/>
        </div>
    )
}

const SectionLoader = ({ name }) => (
    <div className="flex justify-center items-center py-20 text-foreground/70 animate-pulse">
        <p>Loading {name}....</p>
    </div>
)

const Placeholder = ({ name }) => (
    <div className="min-h-[80vh] flex items-center justify-center text-foreground/40 italic text-center">
        <p>Scroll to load {name} section...</p>
    </div>
)