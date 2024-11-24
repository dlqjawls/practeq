<!-- src/components/YoutubeTrailerModal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <iframe 
        :src="`https://www.youtube.com/embed/${trailerId}`" 
        frameborder="0" 
        allowfullscreen
      ></iframe>
      <button @click="closeModal">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isVisible = ref(true);
const trailerId = ref('');

onMounted(() => {
  const movieId = route.params.movieId;

  if (movieId) {
   
    trailerId.value = getTrailerId(movieId);
  }
});

const closeModal = () => {
  isVisible.value = false;
};

// 임시 예고편 ID 가져오는 함수
const getTrailerId = (movieId) => {
  // 실제 예고편 데이터를 가져오는 API나 로직을 사용해야 합니다
  return 'dQw4w9WgXcQ'; // 임시 예시 ID
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 800px;
  width: 100%;
}

button {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #cc0000;
}

iframe {
  width: 100%;
  height: 450px;
  border-radius: 10px;
}
</style>
