<template>
  <div class="movie-list">
    <h1>Movie top List</h1>
    <div class="movie-grid">
      <MovieCard
        v-for="(movie, index) in movieList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MovieCard from '@/components/MovieListView/MovieCard.vue'

const movieList = ref([])
onMounted(async () => {
  try {
    const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
      }
    });
    movieList.value = res.data.results;
    console.log('영화 목록 불러옴:', movieList.value); // 영화 목록 로드 확인
  } catch (error) {
    console.error('영화 목록을 불러오는 데 실패했습니다:', error);
  }
});
</script>

<style scoped>
.movie-list {
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 카드가 가로로 배치되도록 설정 */
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr); /* 화면 크기가 작아지면 2개씩 배치 */
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: 1fr; /* 화면이 더 작아지면 1개씩 배치 */
  }
}
</style>