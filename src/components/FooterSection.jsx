import { ArrowUp } from "lucide-react"

export const FooterSection = () => {
    return (
        <footer className="py-12 px-6 bg-card relative border-t border-border mt-16">
            <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} Karthi's Portfolio. All rights reserved.
                </p>
                <a href="#hero" aria-label="back to top" className="cosmic-button">
                    <ArrowUp size={20}/>
                </a>
            </div>
        </footer>
    )
};