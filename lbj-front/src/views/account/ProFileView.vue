<template>
  <div>
    <h1>{{ store1.username }}의 개인 프로필 페이지</h1>

    <!-- 프로필 사진 -->
    <div class="profile-picture-container">
      <img 
        :src="profilePicture || defaultPicture" 
        alt="프로필 사진" 
        class="profile-picture"
      />
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept="image/*" 
        class="file-input"
      />
      <button @click="saveProfilePath" class="upload-button">프로필 사진 저장</button>
    </div>

    <!-- 좋아요한 영화 포스터 -->
    <div v-if="likedMovies.length > 0" class="liked-movies">
      <h2>좋아요한 영화</h2>
      <div class="movie-posters">
        <div v-for="movie in likedMovies" :key="movie.id" class="movie-poster">
          <router-link :to="{ name: 'movieDetail', params: { movieId: movie.id }}">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
          </router-link>
          <!-- <p>{{ movie.title }}</p> -->
        </div>
      </div>
    </div>
    <p v-else>좋아요한 영화가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProfileStore } from "@/stores/profile"; // Pinia store import
import { useCounterStore } from "@/stores/counter";
import axios from "axios"; // Axios for server communication
import { RouterLink } from "vue-router";
const store1 = useCounterStore()
const store = useProfileStore(); // Pinia Store 호출
const defaultPicture = "/uknowgimozzi.jpg"; // 기본 프로필 사진 경로
const profilePicture = ref(store.profilePicture); // Pinia에서 프로필 사진 URL 로드
const base64Image = ref(""); // Base64 문자열 저장
const likedMovies = ref([]); // 좋아요한 영화 목록

// 파일 업로드 핸들러
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    // 파일을 Base64로 변환
    reader.onload = () => {
      base64Image.value = reader.result; // Base64 데이터 저장
      profilePicture.value = reader.result; // 미리보기
    };

    reader.readAsDataURL(file); // 파일 읽기 시작
  }
};

// 서버로 이미지 업로드
const saveProfilePath = async () => {
  if (!base64Image.value) {
    alert("사진을 먼저 선택해주세요!");
    return;
  }

  try {
    const response = await axios.post(
      "http://3.36.40.72/account/update-profile",
      {
        profilePictureBase64: base64Image.value, // Base64 데이터 전송
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
        },
      }
    );

    if (response.data.success) {
      store.profilePicture = profilePicture.value; // Pinia 상태 업데이트
      alert("프로필 사진이 성공적으로 저장되었습니다!");
    } else {
      throw new Error("저장 실패");
    }
  } catch (error) {
    console.error("프로필 사진 저장 중 오류 발생:", error);
    alert("프로필 사진 저장에 실패했습니다. 다시 시도해주세요.");
  }
};

// 좋아요한 영화 목록 가져오기
onMounted(async () => {
  try {
    console.log(store1.username)
    const response = await axios.get(`http://3.36.40.72:8000/accounts/${store1.username}/liked-movies/`, 
      {},{
        headers: {
          accept: 'application/json',
          Authorization: `Token ${store1.token}`,
          
        },
      });
    likedMovies.value = response.data.liked_movies || [];
    // console.log(likedMovies.value)
    // for (movie in likedMovies.value){
    //   console.log(movie.id)
    // }
    // axios({
    //   method : 'get',
    //   url : `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
    //   headers: {
    //       accept: 'application/json',
    //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
    //     }
    // })

  } catch (error) {
    console.error("좋아요한 영화 목록을 불러오는 중 오류 발생:", error);
  }
});
</script>
<style scoped>
.profile-picture-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ff0050; /* 빨간색 경계선 */
}

.file-input {
  margin-top: 10px;
}

.upload-button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #ff0050;
}

.liked-movies {
  margin-top: 20px;
}

.movie-posters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.movie-poster img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}
</style>