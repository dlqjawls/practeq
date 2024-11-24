<template>
  <div class="app-container">
    <div class="login-container">
      <h2>로그인</h2>
      <form @submit.prevent="logIn">
        <div class="input-group">
          <label for="username">닉네임</label>
          <input type="text" id="username" v-model="username" placeholder="닉네임을 입력하세요" required />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required />
        </div>

        <button class="button1" type="submit">로그인</button>
        <div class="signup-link">
          <p>계정이 없으신가요?</p>
          <router-link to="/createuser">
            <button class="button2">회원가입</button>
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";

const username = ref("");
const password = ref("");

const store = useCounterStore();

const logIn = () => {
  const payload = {
    username: username.value,
    password: password.value,
  };
  store.logIn(payload);
};
</script>

<style scoped>
/* 전체 배경 설정 */
.app-container {
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  min-height: 100vh; /* 화면 전체 높이 */
  background-color: #141414; /* 넷플릭스 다크 배경 */
  color: #fff;
  margin: 0;
}

/* 로그인 박스 */
.login-container {
  width: 350px;
  padding: 30px;
  background: #222; /* 다크 그레이 배경 */
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5); /* 더 강렬한 그림자 */
  text-align: center;
}

/* 제목 */
h2 {
  font-size: 1.8rem;
  /* color: #e50914; 넷플릭스 레드 */
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* 입력 그룹 */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #b3b3b3; /* 라이트 그레이 */
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background-color: #333; /* 어두운 배경 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5); /* 입력창 안쪽 그림자 */
  outline: none;
  transition: box-shadow 0.3s, transform 0.3s;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #b3b3b3;
}

input[type="text"]:focus,
input[type="password"]:focus {
  box-shadow: 0 0 10px #e50914; /* 포커스 시 빨간 그림자 */
  transform: scale(1.02);
}

/* 로그인 버튼 */
.button1 {
  width: 100%;
  padding: 12px;
  background-color: #e50914; /* 넷플릭스 레드 */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s, transform 0.3s;
}

.button1:hover {
  background-color: #f6121d; /* 더 밝은 빨강 */
  transform: scale(1.05);
}

/* 회원가입 버튼 */
.button2 {
  margin-top: 15px;
  padding: 10px;
  background-color: transparent;
  color: #e50914; /* 레드 포인트 */
  border: 1px solid #e50914;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

.button2:hover {
  background-color: #e50914;
  color: #fff;
  transform: scale(1.05);
}

/* 회원가입 링크 */
.signup-link {
  margin-top: 20px;
  text-align: center;
}

.signup-link p {
  color: #b3b3b3;
  margin-bottom: 10px;
}
</style>
