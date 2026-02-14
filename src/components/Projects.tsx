// ================================
// Projects Section Component
// ================================

import { useState } from "react";
import "./Projects.css";
import projectsData from "./data/projects.json";

type Filter = "All Projects" | "ML" | "Data & Analytics" | "Web Development" | "Others";

type Project = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    category: Filter;
    image: string;
    link: string;
    year: string;
};

const Projects = () => {
    const { projects, filters } = projectsData;
    const [activeFilter, setActiveFilter] = useState<Filter>("All Projects");

    const visibleProjects = (projects as Project[]).filter((p) =>
        activeFilter === "All Projects" ? true : p.category === activeFilter
    );

    return (
        <section id="projects" className="projects-section">
            {/* Filter Bar */}
            <div className="filter-bar" role="tablist" aria-label="Project filters">
                {filters.map((f) => (
                    <button
                        key={f}
                        className={`filter-chip ${activeFilter === f ? "active" : ""}`}
                        onClick={() => setActiveFilter(f as Filter)}
                        role="tab"
                        aria-selected={activeFilter === f}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid">
                {(visibleProjects as Project[]).map((proj) => (
                    <article key={proj.id} className="project-card">
                        {/* Project Image */}
                        <div className="project-image-wrapper">
                            <img
                                src={proj.image}
                                alt={proj.title}
                                className="project-image"
                            />
                        </div>

                        {/* Project Content */}
                        <div className="project-content">
                            {/* Meta Row: Category ---- Year */}
                            <div className="project-meta">
                                <span className="project-category">{proj.category}</span>
                                <span className="project-year">{proj.year}</span>
                            </div>

                            <h3 className="project-title">{proj.title}</h3>
                            <p className="project-description">{proj.description}</p>

                            <div className="project-tags">
                                {proj.tags.map((t) => (
                                    <span key={t} className="project-tag">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="project-divider"></div>

                        {/* View Project - Full Width Clickable */}
                        <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-view-section"
                        >
                            <span>View Project</span>
                            <svg
                                className="project-arrow"
                                width="20"
                                height="20"
                                margin="1rem"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;
