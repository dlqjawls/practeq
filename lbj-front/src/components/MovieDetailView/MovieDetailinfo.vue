<template>
  <div v-if="movieDetail" class="movie-detail-container">
    <h1 v-if="movieDetail">{{ movieDetail.title }}</h1>
    <div class="movie-poster">
      <img :src="`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`" alt="Movie Poster" />
    </div>
    <div class="movie-info">
      <p class="movie-overview">{{ movieDetail.overview }}</p>
      <div class="movie-meta">
        <p><strong>출시 날짜:</strong> {{ movieDetail.release_date }}</p>
        <p><strong>평점:</strong> {{ movieDetail.vote_average }}</p>
        <button @click="openModal" class="youtube-button">예고편 보기</button>
        <!-- 좋아요/취소 버튼 -->
        <button @click="toggleLike" class="like-button">
          {{ liked ? "❤️ 좋아요 취소" : "👍 좋아요" }} ({{ likeCount }})
        </button>
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
import axios from 'axios'; // Axios 임포트
import { useMovieStore } from '@/stores/movie'; // Movie store 사용
import { useCounterStore } from '@/stores/counter';

const props = defineProps({
  movieId: {
    type: Object,
    required: true
  }
});
const storecounter =  useCounterStore()

const store = useMovieStore();
const movieDetail = ref(null); // 영화 세부 정보
const showModal = ref(false); // 모달 상태
const trailerId = ref(''); // 예고편 ID
const likeCount = ref(0); // 좋아요 수
const liked = ref(false); // 사용자가 좋아요를 눌렀는지 여부

// 컴포넌트 마운트 시 데이터 로드
onMounted(async () => {
  if (props.movieId !== undefined) {
    movieDetail.value = await store.movieDetail(props.movieId);
    trailerId.value = await store.getTrailerId(props.movieId);

    // 서버에서 초기 좋아요 상태와 좋아요 수 로드
    try {
      const response = await axios.get(`http://3.36.40.72:8000/movies/${props.movieId}/like-num/`);
      likeCount.value = response.data.like_count || 0;
      for(let person in response.data.liked_by_usernames){
        
        if (storecounter.username == response.data.liked_by_usernames[person]){
          liked.value = !liked.value
          
          break
        }
      }
      console.log(response)
      
    } catch (error) {
      console.error('좋아요 정보를 가져오지 못했습니다:', error);
    }
  } else {
    console.error('movieId가 undefined입니다.');
  }
});

// 좋아요/취소 토글 함수
const toggleLike = async () => {
  if (liked.value) {
    // 좋아요 취소
    try {
      await axios.post(`http://3.36.40.72:8000/movies/${props.movieId}/like/`,
      {},
        {headers: {
          accept: 'application/json',
          Authorization: `Token ${storecounter.token}`,
          
        },}
      )
      liked.value = false;
      likeCount.value--; // 좋아요 수 감소
      console.log('좋아요 취소 성공');
    } catch (error) {
      console.error('좋아요 취소 실패:', error);
    }
  } else {
    // 좋아요 추가
    try {
      console.log(storecounter.token)
      await axios.post(`http://3.36.40.72:8000/movies/${props.movieId}/like/`,{},{
        headers: {
          accept: 'application/json',
          Authorization: `Token ${storecounter.token}`,
          
        },
      });
      liked.value = true;
      likeCount.value++; // 좋아요 수 증가
      console.log('좋아요 추가 성공');
    } catch (error) {
      console.error('좋아요 추가 실패:', error);
    }
  }
};

// 모달 열기/닫기
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
  margin-top: 100px;
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

/* 좋아요 버튼 스타일 */
.like-button {
  background-color: #282828;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 1.1em;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.like-button:hover {
  background-color: #3c3c3c;
  transform: scale(1.05);
}

/* 유튜브 버튼 */
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
  background-color: #e50914; 
  transform: scale(1.05); 
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
