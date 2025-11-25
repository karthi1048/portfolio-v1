// import { useState } from 'react';
// import { projects } from '../lib/projectData';
// import { ExternalLink, Github } from "lucide-react";
// import { ProjectCard } from "../components/ProjectCard"
// import Modal from "../components/Modal"

export const Projects = () => {
    // const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="min-h-screen bg-background relative overflow-x-hidden text-foreground">
            <main id="projects-page" aria-labelledby="projects-page" className="min-h-screen flex flex-col items-center justify-center text-center">
                <h1 id="projects-title" className="text-4xl font-bold tracking-tight mb-12">
                    Projects
                </h1>
                <section aria-label="Project List" className="max-w-4xl mx-auto space-y-6">
                    <p className="text-lg text-foreground/80">
                        This page will soon include a list of my projects.
                    </p>
                    <a href="/" className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform duration-300">
                    Go Back Home
                </a>
                </section>
                
                {/* <section className="mt-4 mx-auto max-w-5xl">
                    <h2 className="text-xl mb-4">Project Cards</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, key) => (
                            <ProjectCard 
                                key={project.id} project={project} delay={key * 120}
                                onClick={ () => setSelectedProject(project) }
                            />
                        ))}
                    </div>

                    <Modal isOpen={!!selectedProject} onClose={ () => setSelectedProject(null) }>
                        {selectedProject && (
                            <div>
                                <h3 className="text-2xl font-semibold mt-8 mb-2">{selectedProject.title}</h3>
                                <div 
                                    className='text-muted-foreground text-left leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:list-inside'
                                    dangerouslySetInnerHTML={{ __html: selectedProject.description }}
                                />
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedProject.tags.map((tag, key) => (
                                        <span key={key} className="px-2 py-1 text-xs font-medium rounded-full border bg-primary/20 text-secondary-foreground">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex gap-3">
                                    <a 
                                        href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-md text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <span><ExternalLink size={20}/></span>
                                        <span>Live Demo</span>
                                    </a>
                                    <a 
                                        href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                                        className="px-4 py-2 rounded-md text-foreground/80 hover:text-primary transition-colors duration-300"
                                    >
                                        <span><Github size={20}/></span>
                                        <span>Source Code</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </Modal>
                </section> */}
            </main>
        </div>
    )
}