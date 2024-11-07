<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요" required />
      </div>

      <div class="input-group">
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="비밀번호를 입력하세요" required />
      </div>

      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // 로그인 로직 처리
      alert(`로그인 정보: 이메일(${this.email}), 비밀번호(${this.password})`);
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  padding: 20px;
  margin: 0 auto;
  background: #ffffffcc; /* 반투명 흰색 배경 */
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  justify-content: center;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #764ba2;
}
</style>
