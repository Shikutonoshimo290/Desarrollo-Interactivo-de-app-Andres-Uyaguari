import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { filtrarPorNombre } from './utils'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [favoritos, setFavoritos] = useState([])

  const filtrados = filtrarPorNombre(users, busqueda)

  function toggleFavorito(id) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

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
        <>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre..."
          />
          <strong>Favoritos: {favoritos.length}</strong>
          {filtrados.length === 0 && <p>Sin resultados.</p>}
          <div className="grid">
            {filtrados.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                favorito={favoritos.includes(u.id)}
                onToggleFavorito={toggleFavorito}
              />
            ))}
          </div>
        </>
      )}
    </main>
  )
}