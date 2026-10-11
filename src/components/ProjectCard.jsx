import { useState } from 'react'

const TILE_COLORS = ['#2b4bff', '#e4572e', '#1b998b', '#7b3fe4', '#c9a227']

function tileColor(id) {
  return TILE_COLORS[Number(id) % TILE_COLORS.length]
}

export default function ProjectCard({ project, onRemove }) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = project.imageUrl && !imageFailed

  return (
    <li className="project">
      {showImage ? (
        <img
          className="thumb"
          src={project.imageUrl}
          alt=""
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="thumb tile" style={{ background: tileColor(project.id) }} aria-hidden="true">
          {project.title.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <button
        type="button"
        className="remove"
        onClick={() => onRemove(project.id)}
        aria-label={`Remove ${project.title}`}
      >
        Remove
      </button>
    </li>
  )
}