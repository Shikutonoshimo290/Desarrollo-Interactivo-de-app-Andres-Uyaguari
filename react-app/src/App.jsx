import { useEffect, useState } from 'react'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function cargarUsuarios() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
      setUsers(await res.json())
    } catch (e) {
      setError('No se pudo cargar: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  return (
    <main>
      <h1>Usuarios (React)</h1>
      {loading && <p>Cargando…</p>}
      {error && (
        <p className="error">
          {error} <button onClick={cargarUsuarios}>Reintentar</button>
        </p>
      )}
      {!loading && !error && (
        <ul>
          {users.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>
      )}
    </main>
  )
}