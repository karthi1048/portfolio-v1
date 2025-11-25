import { useEffect, useState, Suspense, lazy, useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { StarBackground } from "../components/StarBackground"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"
import { FooterSection } from "../components/FooterSection"

// Lazy import wrappers for sections
const loadAbout = () => import("../components/AboutMe");
const AboutMe = lazy(() => loadAbout().then(mod => ({ default: mod.default || mod.AboutMe })));

const loadSkills = () => import("../components/SkillsSection");
const SkillsSection = lazy(() => loadSkills().then(mod => ({ default: mod.default || mod.SkillsSection })));

const loadProjects = () => import("../components/ProjectsSection");
const ProjectsSection = lazy(() => loadProjects().then(mod => ({ default: mod.default || mod.ProjectsSection })));

const loadContact = () => import("../components/ContactSection");
const ContactSection = lazy(() => loadContact().then(mod => ({ default: mod.default || mod.ContactSection })));

// Local Error Boundaries
function SectionErrorBoundary({ children }) {
    return (
        <ErrorBoundaryFallback>
            { children }
        </ErrorBoundaryFallback>
    )
}

function ErrorBoundaryFallback({ children }) {
    try {
        return children;
    } catch {
        return (
            <div role="alert" className="text-center text-red-500 py-20">
                Failed to load Section.
            </div>
        )
    }
}

export const Home = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);         // default = light mode

    // Refs for each section
    const aboutRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    // Detect when user scrolls near the section
    const isNearAbout = useOnScreen(aboutRef, "-300px");
    const isNearSkills = useOnScreen(skillsRef, "-300px");
    const isNearProjects = useOnScreen(projectsRef, "-300px");
    const isNearContact = useOnScreen(contactRef, "-300px");

    // Persistent Flags
    const [hasLoadedAbout, setHasLoadedAbout] = useState(false);
    const [hasLoadedProjects, setHasLoadedProjects] = useState(false);
    const [hasLoadedSkills, setHasLoadedSkills] = useState(false);
    const [hasLoadedContact, setHasLoadedContact] = useState(false);

    // preload each section when near viewport
    useEffect(() => {
        if (isNearAbout && !hasLoadedAbout) {
            setHasLoadedAbout(true);
            loadAbout();
        }
        if (isNearSkills && !hasLoadedSkills) {
            setHasLoadedSkills(true);
            loadSkills();
        }
        if (isNearProjects && !hasLoadedProjects) {
            setHasLoadedProjects(true);
            loadProjects();
        }
        if (isNearContact && !hasLoadedContact) {
            setHasLoadedContact(true);
            loadContact();
        }
    }, [isNearAbout, isNearProjects, isNearSkills, isNearContact, hasLoadedAbout, hasLoadedSkills, hasLoadedProjects, hasLoadedContact]);

    // Initial theme check on page load
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        // Check User's preference for dark mode
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const useDark =  storedTheme === "dark" || ( !storedTheme && prefersDark );
        // toggle the presence of dark class on that element 
        document.documentElement.classList.toggle("dark", useDark);
        setIsDarkMode(useDark);
    }, []);

    // Toggles theme & stores it
    const toggleTheme = () => {
        const newIsDark = !isDarkMode;                          // Flips mode
        setIsDarkMode(newIsDark);

        // toggle the presence of dark class on localStorage
        document.documentElement.classList.toggle("dark", newIsDark);
        localStorage.setItem("theme", newIsDark ? "dark" : "light");
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background effects rendered only in dark mode*/}
            { isDarkMode && <StarBackground aria-hidden="true" /> }
            <header>
                <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
            </header>
            <main role="main" className="overflow-x-hidden">
                <HeroSection/>
                <section ref={aboutRef} id="about" aria-labelledby="about-title" className="py-24 px-4 relative">
                    {/* Landmark Headings for Screen Readers only */}
                    <h2 id="about-title" className="sr-only">About Section</h2>
                    <Suspense fallback={ <SectionLoader name="About" /> }>
                        <SectionErrorBoundary>
                            { hasLoadedAbout ? <AboutMe /> : <Placeholder name="About" />}
                        </SectionErrorBoundary>
                    </Suspense>
                </section>
                <section ref={skillsRef} id="skills" aria-labelledby="skills-title" className="py-24 px-4 relative bg-secondary/30">
                    <h2 id="skills-title" className="sr-only">Skills Section</h2>
                    <Suspense fallback={ <SectionLoader name="Skills" /> }>
                        <SectionErrorBoundary>
                            { hasLoadedSkills ? <SkillsSection /> : <Placeholder name="Skills" />}
                        </SectionErrorBoundary>
                    </Suspense>
                </section>
                <section ref={projectsRef} id="projects" aria-labelledby="projects-title" className="py-24 px-4 relative">
                    <h2 id="projects-title" className="sr-only">Projects Section</h2>
                    <Suspense fallback={ <SectionLoader name="Projects" /> }>
                        <SectionErrorBoundary>
                            { hasLoadedProjects ? <ProjectsSection /> : <Placeholder name="Projects" />}
                        </SectionErrorBoundary>
                    </Suspense>
                </section>
                <section ref={contactRef} id="contact" aria-labelledby="contact-title" className="py-24 px-4 relative bg-secondary/30">
                    <h2 id="contact-title" className="sr-only">Contact Section</h2>
                    <Suspense fallback={ <SectionLoader name="Contact Form" /> }>
                        <SectionErrorBoundary>
                            { hasLoadedContact ? <ContactSection /> : <Placeholder name="Contact" />}
                        </SectionErrorBoundary>
                    </Suspense>
                </section>
            </main>
            <FooterSection/>
        </div>
    )
}

// Fallback components

const SectionLoader = ({ name }) => (
    <div role="status" aria-live="polite" className="flex justify-center items-center py-20 text-foreground/70 animate-pulse">
        <p>Loading {name}....</p>
    </div>
)

const Placeholder = ({ name }) => (
    <div aria-live="off" className="min-h-[80vh] flex items-center justify-center text-foreground/40 italic text-center">
        <p>Scroll to load {name} section...</p>
    </div>
)