<script setup>
import { ref, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'

const users = ref([])
const loading = ref(true)
const error = ref('')

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
        <div v-else class="grid">
            <UserCard v-for="u in users" :key="u.id" :user="u" />
        </div>
    </main>
</template>
