import { Briefcase, Code, FileText, User } from "lucide-react"

export const AboutMe = () => {
    return (
        <section id="about" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                    About <span className="text-primary"> Me</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left side */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Passionate Web Developer & Tech Creator</h3>
                        <p className="text-muted-foreground">
                            With over 5 years of experience in web development, I specialize in creating responsive, accessible,
                            & performant web applications using modern technologies.
                        </p>
                        <p className="text-muted-foreground">
                            I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning new
                            technologies & techniques to stay at the forefront of the ever-evolving web landscape.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                            <a href="#contact" className="cosmic-button">
                                Get In Touch
                            </a>
                            {/* CV */}
                            <a href="" className="px-6 py-2 flex gap-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300">
                                <span>View My CV</span>
                                <FileText/>
                            </a>
                        </div>
                    </div>
                    {/* Right side */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Card 1 - Code */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Web development</h4>
                                    <p className="text-muted-foreground">
                                        Creating responsive websites & web applications with modern frameworks.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Card 2 - User (UI) */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">UI/UX Design</h4>
                                    <p className="text-muted-foreground">
                                        Designing intuitive user interfaces & seamless user experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Card 3 - Experience (UX) */}
                        <div className="gradient-border p-6 card-hover">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary"/>
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg">Project Management</h4>
                                    <p className="text-muted-foreground">
                                        Leading projects from conception to completion with agile methodologies.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}