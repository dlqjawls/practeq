<template>
  <div class="movie-list">
    <h1>Search Result for "{{ query }}"</h1>
    <div v-if="movieList.length > 0" class="movie-grid">
   
      <MovieCard
        v-for="(movie, index) in movieList"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <p v-else class="no-results">검색 결과가 없습니다.</p>
    
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import MovieCard from "@/components/MovieListView/MovieCard.vue";
import { useRoute } from "vue-router";

// 상태 변수
const movieList = ref([]);
const route = useRoute();
const query = ref(route.query.query ? String(route.query.query) : "");
const find = ""
// 영화 데이터 요청 함수
const findmovie = async () => {
  if (!query.value) {
    movieList.value = [];
    // alert('검색창을 채워주세요')
    return;
  }

  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query.value
    )}&include_adult=false&language=ko-KR&page=1`;
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    movieList.value = response.data.results; // 데이터를 movieList에 직접 할당
  } catch (error) {
    console.error("영화 목록을 불러오는 데 실패했습니다:", error);
  }
};


// 초기 데이터 로드
findmovie();

// query 값 변경 감지
watch(
  () => route.query.query,
  (newQuery) => {
    query.value = String(newQuery);
    findmovie();
    // find= query.value
    // query.value= ""
  }
);
</script>

<style scoped>
.movie-list {
  padding: 20px;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2vw; /* 반응형 간격 */
  margin-top: 20px;
}

.no-results {
  margin-top: 20px;
  font-size: 1.2rem;
  color: gray;
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }
}
</style>
