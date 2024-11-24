<template>
  <div class="movie-list">
    <div class="header">
      <h1>영화 목록</h1>
    </div>
    <!-- 첫 번째 Swiper: 인기 영화 목록 -->
    <Swiper
      :slides-per-view="5"
      :space-between="15"
      :breakpoints="breakpoints"
      navigation
      pagination
    >
      <SwiperSlide v-for="(movie, index) in movieList" :key="movie.id">
        <MovieCard :movie="movie" />
      </SwiperSlide>
    </Swiper>

    <div class="header">
      <h1>추천</h1>
    </div>
    <!-- 두 번째 Swiper: 추천 영화 목록 -->
    <Swiper
      :slides-per-view="5"
      :space-between="15"
      :breakpoints="breakpoints"
      navigation
      pagination
    >
      <SwiperSlide v-for="(movie, index) in movieList2" :key="movie.id">
        <MovieCard :movie="movie" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import MovieCard from '@/components/MovieListView/MovieCard.vue'

// 영화 목록 (인기 영화)
const movieList = ref([])

// 추천 영화 목록
const movieList2 = ref([])

// 반응형 설정
const breakpoints = {
  1200: { slidesPerView: 4, spaceBetween: 20 },
  768: { slidesPerView: 2, spaceBetween: 10 },
  576: { slidesPerView: 1, spaceBetween: 5 },
  300: { slidesPerView: 1, spaceBetween: 5 }
}

onMounted(async () => {
  try {
    // 인기 영화 목록 받아오기
    const popularResponse = await axios.get('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs',
      }
    })
    movieList.value = popularResponse.data.results

    // 추천 영화 목록 받아오기
    const topRatedResponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs',
      }
    })
    movieList2.value = topRatedResponse.data.results
  } catch (error) {
    console.error('영화 목록을 불러오는 데 실패했습니다:', error)
  }
})
</script>

<style scoped>
.movie-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  min-height: 100vh;
  padding: 20px;
  font-family: "Noto Sans KR", sans-serif;
}

.header {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  border-bottom: 1px solid #333;
}

.header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
}

.swiper {
  width: 100%;
  padding: 20px 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
