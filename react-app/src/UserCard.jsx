export default function UserCard({ user, favorito, onToggleFavorito }) {
  return (
    <article className="card">
      <h3>{user.name}</h3>
      <p>📧 {user.email}</p>
      <p>📍 {user.address.city}</p>
      <button onClick={() => onToggleFavorito(user.id)}>
        {favorito ? '★ Quitar favorito' : '☆ Favorito'}
      </button>
    </article>
  )
}