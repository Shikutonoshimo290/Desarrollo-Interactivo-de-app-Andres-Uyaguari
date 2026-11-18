export function filtrarPorNombre(users, texto) {
  const t = texto.trim().toLowerCase()
  return users.filter((u) => u.name.toLowerCase().includes(t))
}