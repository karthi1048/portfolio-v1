import { useRef, useState } from 'react';
import useOnScreen from '../hooks/useOnScreen';
import { imageMap }  from '../lib/assetLoader';
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Modal from './Modal';

const projects = [
    {
        id: 1,
        title: "Diabetes Predictor For Females",
        description: "A page for the website 2",
        image: imageMap['diabetes_predictor.png'],
        tags: ["Python", "Streamlit"],
        demoUrl: "https://huggingface.co/spaces/karthi1048/diabetes-predictor-for-females",
        githubUrl: "https://github.com/karthi1048/diabetes-predictor.git",
    },
    {
        id: 2,
        title: "Kanban PWA",
        description: "A page for the website 2",
        image: imageMap['kanban_pwa.png'],
        tags: ["React", "Tailwind", "Vite SWR"],
        demoUrl: "https://kanban-pwa.netlify.app/",
        githubUrl: "https://github.com/karthi1048/kanban-PWA.git",
    },
    {
        id: 3,
        title: "Render Gallery",
        description: "A page for the website 3",
        image: imageMap['render_gallery.png'],
        tags: ["Javascript", "Bootstrap"],
        demoUrl: "https://karthi1048.github.io/render-gallery/",
        githubUrl: "https://github.com/karthi1048/render-gallery.git",
    },
    {
        id: 4,
        title: "2048 Game",
        description: "A page for the website",
        image: imageMap['2048_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/2048/",
        githubUrl: "https://github.com/karthi1048/2048.git",
    },
    {
        id: 5,
        title: "Tic Tac Toe Game",
        description: "A page for the website 2",
        image: imageMap['tic_tac_toe_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/Tic-Tac-Toe/",
        githubUrl: "https://github.com/karthi1048/Tic-Tac-Toe.git",
    },
    {
        id: 6,
        title: "Rock Paper Scissors Game",
        description: "A page for the website 2",
        image: imageMap['rock_paper_scissors_game.png'],
        tags: ["Javascript"],
        demoUrl: "https://karthi1048.github.io/RPS-Project/",
        githubUrl: "https://github.com/karthi1048/RPS-Project.git",
    },
];

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState(null);

    try {
        return (
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center"> Featured <span className="text-primary"> Projects </span></h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Here are some of my recent projects. Each project was carefully crafted with attention to detail,
                    performance & user experience.
                </p>
    
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, key) => (
                        <ProjectCard 
                            key={project.id} project={project} delay={key * 120}
                            onClick={ () => setSelectedProject(project) }
                        />
                    ))}
                </div>

                <Modal isOpen={!!selectedProject} onClose={ () => setSelectedProject(null) }>
                    {/* Below JSX code becomes "children" */}
                    {selectedProject && (
                        <div>
                            <h3 className="text-2xl font-semibold mb-2">{selectedProject.title}</h3>
                            <p className="text-sm mb-4">{selectedProject.description}</p>
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

                <div className="text-center mt-12">
                    {/* Set the "role" to be button */}
                    <a href="https://www.github.com/karthi1048" target="_blank" rel="noopener noreferrer"
                        className="cosmic-button w-fit flex items-center mx-auto gap-2"
                    >
                        Check My Github <ArrowRight size={16}/>
                    </a>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error in the section: ", error);
        return <div>Error loading section: {error.message}</div>
    }
}


const ProjectCard = ({ project, delay, onClick }) => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref, "-60px");      // small margin for early trigger

    return (
        <div 
            // id='projects'
            ref={ref} 
            onClick={onClick}
            style={{ transitionDelay: `${delay}ms` }}
            className={`group bg-card rounded-lg overflow-hidden shadow-xs card-hover 
                transition-all duration-300 ease-out transform 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="h-48 overflow-hidden">
                {/* Image expands within the card */}
                <img src={project.image} alt={project.title} loading='lazy'
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, key) => (
                        <span key={key} className="px-2 py-1 text-xs font-medium rounded-full border bg-primary/20 text-secondary-foreground">{tag}</span>
                    ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            </div>
        </div>
    )
}
