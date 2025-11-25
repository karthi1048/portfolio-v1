import { StarBackground } from "../components/StarBackground"

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden text-foreground">
            {/* <StarBackground/> */}
            <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <h1 className="text-4xl font-semibold mb-4">
                    404 - Page Not Found
                </h1>
                <p className="text-foreground/70 mb-8 max-w-md">
                    The Page you are looking for does not exist or has been moved.
                </p>
                <a href="/" className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300">
                    Go Back Home
                </a>
            </main>
        </div>
    )
}