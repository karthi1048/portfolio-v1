import { ArrowUp } from "lucide-react"
// import '@/index.css'

export const FooterSection = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
            <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Karthi's Portfolio, All rights reserved.
            </p>

            <a href="#hero" 
                // className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                className="cosmic-button">
                <ArrowUp size={20}/>
            </a>
            {/* <p className="example-card">Welcome</p> */}
        </footer>
    )
}