import { useState, useRef } from "react";
import useOnScreen from "../hooks/useOnScreen";
import { classNs } from "../lib/utils";
import { svgMap } from "../lib/assetLoader";
import { Filter } from "lucide-react";

const skills = [
    {name: "HTML", level: 100, category: "frontend", icon: svgMap['html']},
    {name: "CSS", level: 80, category: "frontend", icon: svgMap["css"]},
    {name: "JavaScript", level: 85, category: "frontend", icon: svgMap["javascript"]},
    {name: "TypeScript", level: 50, category: "frontend", icon: svgMap["typescript"]},
    {name: "React", level: 60, category: "frontend", icon: svgMap['react']},
    {name: "Tailwind CSS", level: 80, category: "frontend", icon: svgMap["tailwindcss"]},
    {name: "Bootstrap", level: 75, category: "frontend", icon: svgMap['bootstrap']},
    {name: "Node.js", level: 30, category: "backend", icon: svgMap["nodejs"]},
    {name: "MySQL", level: 60, category: "backend", icon: svgMap["mysql"]},
    {name: "Git", level: 80, category: "tools", icon: svgMap["git"]},
    {name: "Vite", level: 80, category: "tools", icon: svgMap['vite']},
    {name: "VS Code", level: 85, category: "tools", icon: svgMap["vscode"]},
    {name: "Python", level: 100, category: "others", icon: svgMap["python"]},
    {name: "C", level: 70, category: "others", icon: svgMap["c"]},
    {name: "Blender", level: 70, category: "others", icon: svgMap['blender']},
];

const categories = ["all", "frontend", "backend", "tools", "others"];

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const [showFilters, setShowFilters] = useState(true);

    const filteredSkills = skills.filter((skill) => (
        activeCategory === "all" || skill.category === activeCategory
    ));

    return (
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary"> Skills</span>
            </h2>

            <div className="flex items-center justify-start mb-6 flex-wrap gap-4">
                <button
                    onClick={() => setShowFilters(prev => !prev)} aria-expanded={showFilters}
                    className="font-semibold text-xl flex items-center gap-3 cursor-pointer select-none hover:bg-primary/50 transition-colors duration-300"
                >
                    <Filter aria-hidden="true" />
                    <span>Category Filter</span>
                </button>
                <div 
                    className={classNs(
                        "overflow-hidden transition-all duration-500", 
                        showFilters ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                        "flex flex-wrap gap-4 w-full md:w-auto md:items-center"
                    )}>
                    {categories.map((category, key) => (
                        <button 
                            key={key} 
                            onClick={ () => setActiveCategory(category) }
                            aria-pressed={ activeCategory === category }
                            className={ classNs("px-5 py-2 rounded-full cursor-pointer transition-colors duration-700 capitalize",
                                activeCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}>
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            {/* Category filter */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, key) => (
                    <SkillCard key={key} skill={skill} delay={key * 80}/>
                ))}
            </div>
        </div>
    )
}

const SkillCard = ({ skill, delay = 0 }) => {
    const ref = useRef(null);
    const isVisible = useOnScreen(ref, "-10px");      // small margin for early trigger

    return (
        <article 
            ref={ref} style={{ transitionDelay: `${delay}ms` }}
            className={classNs(
                "bg-card p-6 rounded-lg shadow-xs card-hover transition-all duration-300 ease-out transform",
                isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8"
            )}>
            <div className="text-left mb-4 flex justify-between items-center">
                <h3 className="font-semibold text-lg">{ skill.name }</h3>
                <img src={ skill.icon } alt="" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-1">
                <div aria-hidden="true" className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                    {/* grow animate when card is visible */}
                    <div role="progressbar"
                        aria-valuemin={0} aria-valuemax={100} aria-valuenow={skill.level}
                        className={classNs(
                            "bg-primary h-2 rounded-full origin-left",
                            isVisible ? "animate-grow" : ""
                        )}
                        style={{ "--target-width" : `${skill.level}%` }}
                    />
                </div>
                <span aria-hidden="true" className="text-sm text-muted-foreground">{ skill.level }%</span>
            </div>
        </article>
    )
}