import { useEffect, useMemo, useState } from 'react'
import ProjectForm from './components/ProjectForm.jsx'
import ProjectList from './components/ProjectList.jsx'
import { STORAGE_KEY, seedProjects } from './data.js'

function loadProjects() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : seedProjects
  } catch {
    return seedProjects
  }
}

export default function App() {
  const [projects, setProjects] = useState(loadProjects)
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch {
      /* storage unavailable; the app still works for this session */
    }
  }, [projects])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return projects
    return projects.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
    )
  }, [projects, query])

  function addProject(data) {
    setProjects((prev) => [{ id: Date.now(), ...data }, ...prev])
    setQuery('')
  }

  function removeProject(id) {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <>
      <header className="site-header">
        <h1>Personal Project Showcase</h1>
      </header>
      <main className="layout">
        <ProjectForm onAdd={addProject} />
        <ProjectList
          projects={visible}
          total={projects.length}
          query={query}
          onQueryChange={setQuery}
          onRemove={removeProject}
        />
      </main>
    </>
  )
}