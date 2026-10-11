import { useState } from 'react'

export default function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      setError('Add a title and a description to save the project.')
      return
    }
    onAdd({ title: title.trim(), description: description.trim(), imageUrl: imageUrl.trim() })
    setTitle('')
    setDescription('')
    setImageUrl('')
    setError('')
  }

  return (
    <section className="panel" aria-labelledby="add-heading">
      <h2 id="add-heading">Add project</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="title">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="imageUrl">
          Image link <span className="optional">(optional)</span>
        </label>
        <input
          id="imageUrl"
          type="url"
          placeholder="https://"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="primary">
          Add project
        </button>
      </form>
    </section>
  )
}