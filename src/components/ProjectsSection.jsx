import { useState } from 'react';
import { projects } from '../lib/projectData';
import { ProjectCard } from './ProjectCard';
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { sanitizeHTML } from '../lib/sanitizeHTML';
import useFocusReturn from '../hooks/useFocusReturn';
import Modal from './Modal';

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState(null);
    const { remember, restore } = useFocusReturn();

    const openModal = (project, triggerElement) => {
        remember(triggerElement);
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
        restore();
    }

    return (
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> 
                Featured <span className="text-primary"> Projects </span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Here are some of my recent projects. Each project was carefully crafted with attention to detail,
                performance & user experience.
            </p>

            <div aria-live='polite' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, key) => (
                    <ProjectCard 
                        onOpen={(element) => openModal(project, element)}
                        key={project.id} project={project} delay={key * 120}
                    />
                ))}
            </div>

            <Modal 
                isOpen={!!selectedProject}
                onClose={closeModal}>
                {/* Below JSX code becomes "children" */}
                {selectedProject && (
                    <div>
                        <h3 id={`project-title-${selectedProject.id}`} className="text-2xl font-semibold mt-8 mb-2">
                            {selectedProject.title}
                        </h3>
                        {/* dangerouslySetInnerHTML -> Renders HTML safely for static content */}
                        {/* NOTE: [&_ul]:list-disc [&_ul]:list-inside -> to all ul elements inside it, have 'disc inside' */}
                        <div 
                            className='text-muted-foreground text-left leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:list-inside'
                            dangerouslySetInnerHTML={{ __html: sanitizeHTML(selectedProject.description) }}
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
                                <span><ExternalLink aria-hidden='true' size={20}/></span>
                                <span>Live Demo</span>
                            </a>
                            <a 
                                href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                                className="px-4 py-2 rounded-md text-foreground/80 hover:text-primary transition-colors duration-300"
                            >
                                <span><Github aria-hidden='true' size={20}/></span>
                                <span>Source Code</span>
                            </a>
                        </div>
                    </div>
                )}
            </Modal>

            <div className="text-center mt-12">
                <a href="/Projects" target="_blank" rel="noopener noreferrer" role='button'
                    className="cosmic-button w-fit flex items-center mx-auto gap-2"
                >
                    More Projects...<ArrowRight size={16}/>
                </a>
            </div>
        </div>
    )
}
