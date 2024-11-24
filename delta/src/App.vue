<template>
  <v-app>
    <!-- 네비게이션 드로어 -->
    <v-navigation-drawer
      app
      permanent
      class="navigation-drawer netflix-drawer"
    >
      <div class="netflix-logo">
        <span>FuFLIX</span>
      </div>
      <div v-if="store.username" class="user-info">
        <h2> 👑 {{ store.username }} 👑</h2>
        <RouterLink to="/change" class="nav-link">비밀번호 변경</RouterLink>
      </div>
      <div v-else class="user-info">
        <h2> Guest 😕🖕</h2>
      </div>
      <v-list dense>
        <v-list-item>
          <RouterLink to="/" class="nav-link">🎥 Home</RouterLink>
        </v-list-item>
        <v-list-item v-if="!store.isLogin">
          <RouterLink to="/login" class="nav-link">🎬 Login</RouterLink>
        </v-list-item>
        <v-list-item v-if="store.isLogin" @click="store.logOut">
          <span class="nav-link">🎬 Logout</span>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/recommend" class="nav-link">✨ Recommendations</RouterLink>
        </v-list-item>
      </v-list>
      <footer class="delete">
        <button v-if="store.isLogin" @click="store.deleteAccount">🖕😕 계정삭제 😕🖕 </button>
      </footer>
    </v-navigation-drawer>

    <!-- 메인 콘텐츠 -->
    <v-main class="main-content">
      <v-container>
        <div class="theater-banner">
          <!-- 로그인 화면과 createuser 화면일 때만 검색창 숨기기 -->
          <div class="search-bar" v-if="!isExcludedPage">
            <input type="text" placeholder="영화 이름을 검색해주세요" v-model="searchQuery" @keyup.enter="SerarchPage"> 
            <button class="nav-link" @click="SerarchPage">찾기</button>
          </div>
          <h1>Welcome to FuFLIX</h1>
          <p>아 어캐하지 ..... 🍿🎬</p>
        </div>
        <RouterView />
      </v-container>
    </v-main>
  
    <footer class="footer">
      <v-container>
        <div class="footer-content">
          <div class="brand-info">
            <h2>FuFLIX</h2>
            <p>© 2024 FuFLIX. All Rights Reserved.</p>
          </div>
          <div class="footer-links">
            <RouterLink to="/about" class="footer-link">About Us</RouterLink>
            <RouterLink to="/terms" class="footer-link">Terms of Service</RouterLink>
            <RouterLink to="/privacy" class="footer-link">Privacy Policy</RouterLink>
          </div>
          <div class="social-media">
            <a href="https://facebook.com" target="_blank" class="social-icon">Facebook</a>
            <a href="https://twitter.com" target="_blank" class="social-icon">Twitter</a>
            <a href="https://instagram.com" target="_blank" class="social-icon">Instagram</a>
          </div>
        </div>
      </v-container>
    </footer>
  
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "@/stores/counter"; // Pinia store import
import { useRouter } from "vue-router"

const store = useCounterStore();
const searchQuery = ref("");
const router = useRouter();

// 로그인 화면과 createuser 화면인지 체크하는 computed property
const isExcludedPage = computed(() => {
  const currentPage = router.currentRoute.value.name;
  return currentPage === 'login' || currentPage === 'createuser'; // 'login'과 'createuser' 페이지가 아닐 때만 검색창 표시
});

const SerarchPage = () => {
  if (searchQuery.value.trim() !== "") {
    router.push({ name: "moviesearch", query: { query: searchQuery.value } });
  } else {
    alert('검색값을 채워주세요');
  }
}
</script>

<style scoped>
/* 네비게이션 드로어 스타일 */
.navigation-drawer.netflix-drawer {
  background-color: #141414;
  color: white;
  border-right: 1px solid #e50914;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 240px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .navigation-drawer.netflix-drawer {
    width: 200px;
  }
}

@media (max-width: 480px) {
  .navigation-drawer.netflix-drawer {
    width: 100%;
    position: absolute;
    z-index: 10;
  }
}

.main-content {
  background-color: #000;
  color: white;
  padding: 2rem;
  margin-left: 240px;
  transition: margin-left 0.3s ease;
}

.main-content.with-drawer {
  margin-left: 240px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 200px;
  }
}

@media (max-width: 480px) {
  .main-content {
    margin-left: 0;
  }
}

.delete {
  text-align: center;
  margin-bottom: 20px;
}
.delete:hover {
  color: #e50914;
}

.netflix-logo {
  font-size: 24px;
  font-weight: bold;
  color: #e50914;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.user-info h2 {
  font-size: 18px;
  color: #fff;
}

.nav-link {
  text-decoration: none;
  color: #b3b3b3;
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin: 10px 0;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #e50914;
}

.theater-banner h1 {
  font-size: 3rem;
  color: #e50914;
  text-shadow: 0 0 20px #e50914;
}

.theater-banner p {
  font-size: 1.2rem;
  color: #b3b3b3;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.search-bar input {
  width: 60%;
  padding: 10px 15px;
  border: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #141414;
  box-shadow: 0 0 10px rgba(229, 9, 20, 0.8);
  outline: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.search-bar input::placeholder {
  color: #b3b3b3;
}

.search-bar input:focus {
  box-shadow: 0 0 15px rgba(229, 9, 20, 1);
  transform: scale(1.05);
}

.search-bar button {
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  background-color: #e50914;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.search-bar button:hover {
  background-color: #f6121d;
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(229, 9, 20, 1);
}

.footer {
  background-color: #141414;
  color: #b3b3b3;
  padding: 20px 0;
  text-align: center;
  border-top: 1px solid #e50914;
  margin-left: 240px;
}

@media (max-width: 768px) {
  .footer {
    margin-left: 200px;
  }
}

@media (max-width: 480px) {
  .footer {
    margin-left: 0;
  }
}

.social-icon {
  color: #b3b3b3;
  font-size: 16px;
  text-decoration: none;
  margin: 0 10px;
}

.social-icon:hover {
  color: #e50914;
}
</style>
