<template>
  <div class="movie-page">
    <!-- 헤드라인 섹션 -->
    <div class="headline" v-if="movieList3.length">
      <Swiper
        :slides-per-view="1"
        :space-between="10"
        centeredSlides="true"
        loop="true"
        :autoplay="autoplay"
        navigation
        pagination
      >
        <SwiperSlide v-for="movie in movieList3" :key="movie.id">
          <router-link
            :to="{ name: 'movieDetail', params: { movieId: movie.id } }"
            class="headline-movie"
          >
            <div class="headline-image">
              <img
                :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path"
                :alt="movie.title"
              />
            </div>
            <div class="headline-content">
              <h2>다가올 영화</h2>
              <h3>{{ movie.title }}</h3>
              <p>{{ movie.overview }}</p>
              <p class="release-date">
                개봉일: {{ formatDate(movie.release_date) }}
              </p>
            </div>
          </router-link>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 인기 영화 섹션 -->
    <div class="movie-list">
      <div class="header">
        <h1>인기 영화</h1>
      </div>
      <Swiper
        :slides-per-view="5"
        :space-between="15"
        :breakpoints="breakpoints"
        navigation
        :autoplay="autoplay"
        centeredSlides="true"
        loop="true"
        slideToClickedSlide="true"
      >
        <SwiperSlide v-for="movie in movieList" :key="movie.id">
          <MovieCard :movie="movie" />
        </SwiperSlide>
      </Swiper>

      <!-- 최고의 평점 섹션 -->
      <div class="header">
        <h1>최고의 평점</h1>
      </div>
      <Swiper
        :slides-per-view="5"
        :space-between="15"
        :breakpoints="breakpoints"
        navigation
        pagination
        centeredSlides="true"
        loop="true"
        slideToClickedSlide="true"
        :autoplay="autoplay2"
      >
        <SwiperSlide v-for="movie in movieList2" :key="movie.id">
          <MovieCard :movie="movie" />
        </SwiperSlide>
      </Swiper>
    </div>
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

const movieList = ref([])
const movieList2 = ref([])
const movieList3 = ref([])

const breakpoints = {
  1200: { slidesPerView: 4, spaceBetween: 20 },
  768: { slidesPerView: 2, spaceBetween: 10 },
  576: { slidesPerView: 1, spaceBetween: 5 },
  300: { slidesPerView: 1, spaceBetween: 5 }
}

const autoplay = {
  delay: 2500,
  disableOnInteraction: false,
}
const autoplay2 = {
  delay: 2500,
  disableOnInteraction: false,
  reverseDirection: true 
}

// 날짜 형식 변환 함수
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('ko-KR', options)
}

onMounted(async () => {
  try {
    const popularResponse = await axios.get('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs',
      }
    })
    movieList.value = popularResponse.data.results

    const topRatedResponse = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs',
      }
    })
    movieList2.value = topRatedResponse.data.results

    const comminsoonResponse = await axios.get('https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs',
      }
    })
    movieList3.value = comminsoonResponse.data.results
  } catch (error) {
    console.error('영화 목록을 불러오는 데 실패했습니다:', error)
  }
})
</script>

<style scoped>
.movie-page {
  background-color: black;
  color: white;
  font-family: "Noto Sans KR", sans-serif;
}

/* 헤드라인 */
.headline {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.55));
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
}

.headline img {
  width: 100%;
  height: 100%;
  
  max-height: 500px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.headline:hover img {
  transform: scale(1.05); /* 이미지 확대 */
}

.headline-content {
  position: absolute;
  bottom: 30px;
  left: 20px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  color: white;
  max-width: 80%;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.headline:hover .headline-content {
  opacity: 1;
  transform: translateY(0); /* 부드럽게 올라오는 애니메이션 */
}

.headline h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
  margin-bottom: 10px;
}

.headline-content h3 {
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.headline-content p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 10px;
}

.headline-content .release-date {
  font-size: 0.9rem;
  font-style: italic;
  color: #f39c12;
}

@media (max-width: 768px) {
  .headline img {
    max-height: 350px;
  }

  .headline-content {
    max-width: 90%;
    bottom: 10px;
    left: 10px;
    padding: 15px;
  }

  .headline h2 {
    font-size: 1.8rem;
  }

  .headline-content h3 {
    font-size: 1.5rem;
  }

  .headline-content p {
    font-size: 0.9rem;
  }
}

/* 영화 목록 */
.header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #e50914;
  text-align: center;
}

.movie-list {
  padding: 10px;
}

.swiper {
  width: 100%;
  padding: 20px 0;
}

.swiper-slide img {
  border-radius: 10px;
  width: 100%;
}
</style>
