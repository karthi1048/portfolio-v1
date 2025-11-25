import { useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";

export const ProjectCard = ({ project, delay = 0, onOpen }) => {
    const cardRef = useRef(null);
    const isVisible = useOnScreen(cardRef, "-60px");      // small margin for early trigger

    const handleOpen = () => onOpen(cardRef.current);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
        }
    };

    return (
        <div
            role="button"
            ref={cardRef}
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label={`Open details for ${project.title}`}
            style={{ transitionDelay: `${delay}ms` }}
            className={`group bg-card rounded-lg overflow-hidden shadow-xs card-hover 
                cursor-pointer transition-all duration-300 ease-out transform 
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
            <div className="h-48 overflow-hidden">
                {/* Image expands within the card */}
                <img src={project.image} alt={project.title} loading='lazy'
                    onClick={(e) => e.stopPropagation()}                    // avoid image click double triggering
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
            </div>
            <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, key) => (
                        <span key={key} aria-hidden='true'
                            className="px-2 py-1 text-xs font-medium rounded-full border bg-primary/20 text-secondary-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.shortDescription}</p>
            </div>
        </div>
    )
}