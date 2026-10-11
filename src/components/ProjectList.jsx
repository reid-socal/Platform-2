import ProjectCard from './ProjectCard.jsx'

export default function ProjectList({ projects, total, query, onQueryChange, onRemove }) {
  return (
    <section className="panel list-panel" aria-labelledby="list-heading">
      <h2 id="list-heading" className="visually-hidden">
        Projects
      </h2>
      <div className="search">
        <input
          type="search"
          aria-label="Search projects"
          placeholder="Search projects"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <p className="count" aria-live="polite">
          {projects.length} of {total} shown
        </p>
      </div>

      {projects.length > 0 ? (
        <ul className="projects">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onRemove={onRemove} />
          ))}
        </ul>
      ) : (
        <p className="empty">
          {total === 0
            ? 'No projects yet. Add your first one above.'
            : `No projects match “${query}”. Try a different word.`}
        </p>
      )}
    </section>
  )
}