<script setup>
defineProps({
  user: { type: Object, required: true },
  favorito: { type: Boolean, default: false }
})
defineEmits(['toggle-favorito'])
</script>

<template>
  <article class="card">
    <h3>{{ user.name }}</h3>
    <p>📧 {{ user.email }}</p>
    <p>📍 {{ user.address.city }}</p>
    <button @click="$emit('toggle-favorito', user.id)">
      {{ favorito ? '★ Quitar favorito' : '☆ Favorito' }}
    </button>
  </article>
</template>