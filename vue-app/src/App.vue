<script setup>
import { ref, computed, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'
import { filtrarPorNombre } from './utils'

const users = ref([])
const loading = ref(true)
const error = ref('')
const busqueda = ref('')
const favoritos = ref([])

const filtrados = computed(() => filtrarPorNombre(users.value, busqueda.value))

function toggleFavorito(id) {
  favoritos.value = favoritos.value.includes(id)
    ? favoritos.value.filter((f) => f !== id)
    : [...favoritos.value, id]
}

async function cargarUsuarios() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error(`Error HTTP ${res.status}`)
    users.value = await res.json()
  } catch (e) {
    error.value = 'No se pudo cargar: ' + e.message
  } finally {
    loading.value = false
  }
}

onMounted(cargarUsuarios)
</script>

<template>
  <main>
    <h1>Usuarios (Vue)</h1>
    <p v-if="loading">Cargando…</p>
    <p v-else-if="error" class="error">
      {{ error }} <button @click="cargarUsuarios">Reintentar</button>
    </p>
    <template v-else>
      <input v-model="busqueda" placeholder="Buscar por nombre..." />
      <strong>Favoritos: {{ favoritos.length }}</strong>
      <p v-if="filtrados.length === 0">Sin resultados.</p>
      <div class="grid">
        <UserCard
          v-for="u in filtrados"
          :key="u.id"
          :user="u"
          :favorito="favoritos.includes(u.id)"
          @toggle-favorito="toggleFavorito"
        />
      </div>
    </template>
  </main>
</template>