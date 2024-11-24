<template>
  <div class="movie-list">
    <div class="header">
      <h1>영화 목록</h1>
    </div>
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
import { ref, onMounted } from "vue";
import axios from "axios";
import MovieCard from "@/components/MovieListView/MovieCard.vue";

const movieList = ref([]);

onMounted(async () => {
  try {
    for (let i = 1; i < 4; i++) {
      await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${i}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs",
        },
      }).then((res) => {
        const result = res.data.results;
        Object.values(result).forEach((value) => {
          movieList.value.push(value);
        });
      });
    }
  } catch (error) {
    console.error("영화 목록을 불러오는 데 실패했습니다:", error);
  }
});
</script>

<style scoped>
/* 전체 컨테이너 */
.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #141414; /* VIBE 앱의 다크 배경 */
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: "Noto Sans KR", sans-serif; /* 깔끔한 폰트 */
}

/* 헤더 */
.header {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #333;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914; /* 강조를 위한 넷플릭스 레드 */
}

/* 영화 카드 그리드 */
.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 기본 5개씩 */
  gap: 15px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr); /* 중간 화면 크기에서는 3개씩 */
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr); /* 작은 화면에서는 2개씩 */
  }
}

@media (max-width: 576px) {
  .movie-grid {
    grid-template-columns: 1fr; /* 매우 작은 화면에서는 1개씩 */
  }
}

/* 애니메이션 */
.movie-grid > * {
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-grid > *:hover {
  transform: translateY(-5px); /* 호버 시 부드러운 위로 이동 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* 강조 효과 */
}
</style>
