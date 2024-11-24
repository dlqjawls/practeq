<template>
  <div v-if="movieDetail" class="movie-detail-container">
    <div class="movie-poster">
      <img :src="`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`" alt="Movie Poster" />
    </div>
    <div class="movie-info">
      <h2 class="movie-title">{{ movieDetail.title }}</h2>
      <p class="movie-overview">{{ movieDetail.overview }}</p>
      <div class="movie-meta">
        <p><strong>출시 날짜:</strong> {{ movieDetail.release_date }}</p>
        <p><strong>평점:</strong> {{ movieDetail.vote_average }}</p>
        <button @click="openModal" class="youtube-button">예고편 보기</button>
      </div>
    </div>
  </div>
  <div v-else class="loading-message">
    <p>영화 정보를 불러오는 중...</p>
  </div>

  <!-- 모달 -->
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <iframe 
        :src="`https://www.youtube.com/embed/${trailerId}`" 
        frameborder="0" 
        allowfullscreen
      ></iframe>
      <button @click="closeModal" class="close-modal-button">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { useMovieStore } from '@/stores/movie';

const props = defineProps({
  movieId: {
    type: Object,
    required: true
  }
});

const store = useMovieStore();
const movieDetail = ref(null);
const showModal = ref(false); // 모달의 표시 여부를 관리하는 변수
const trailerId = ref(''); // 예고편 ID

onMounted(async () => {
  if (props.movieId !== undefined) {
    movieDetail.value = await store.movieDetail(props.movieId);
    trailerId.value = await store.getTrailerId(props.movieId);
  } else {
    console.error('movieId가 undefined입니다.');
  }
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.movie-detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212; /* 다크 테마 배경 */
  padding: 20px;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* 깊이감 추가 */
}

/* 포스터 스타일 */
.movie-poster img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* 이미지에 그림자 */
}

/* 텍스트 영역 */
.movie-info {
  color: #fff;
  text-align: center;
}

.movie-title {
  font-size: 2em;
  font-weight: bold;
  color: #ccc; /* 포인트 컬러 */
  margin-bottom: 10px;
}

.movie-overview {
  font-size: 1.1em;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 20px;
  max-width: 700px;
  text-align: justify;
}

.movie-meta p {
  font-size: 1em;
  color: #888;
  margin: 5px 0;
}

.youtube-button {
  background-color: black; /* 네온 그린 */
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.youtube-button:hover {
  background-color: #e50914; /* 어두운 녹색 */
  transform: scale(1.05); /* 버튼 클릭 유도 */
}

/* 로딩 메시지 */
.loading-message {
  text-align: center;
  color: #fff;
  font-size: 1.2em;
  padding: 20px;
}

/* 모달 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  background: #1c1c1c;
  padding: 20px;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

iframe {
  width: 100%;
  height: 450px;
  border-radius: 8px;
}

/* 모달 닫기 버튼 */
.close-modal-button {
  margin-top: 20px;
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.close-modal-button:hover {
  background-color: #b00710;
  transform: scale(1.05);
}
</style>
