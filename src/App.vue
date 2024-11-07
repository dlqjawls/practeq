<template>
  <div id="app">
    <!-- FadeLogo가 사라지고 Login1이 나타나는 방식으로 설정 -->
    <FadeLogo v-if="showFadeLogo" logoSrc="src/assets/입장.gif" :displayDuration="5000" />
    <Login1 v-if="showLogin" />
  </div>
</template>

<script>
import FadeLogo from './components/FadeLogo.vue';
import Login1 from './components/Login1.vue';

export default {
  components: {
    FadeLogo,
    Login1,
  },
  data() {
    return {
      showFadeLogo: true, // FadeLogo 초기 상태 (표시됨)
      showLogin: false,    // Login1 초기 상태 (숨김)
    };
  },
  mounted() {
    // FadeLogo가 5초 후 사라지고 Login1이 나타나도록 설정
    setTimeout(() => {
      this.showFadeLogo = false;
      this.showLogin = true;
    }, 5000); // 5000ms 후에 실행
  },
};
</script>

<style>
.FadeLogo {
  height: 100vh;
  width: 100vw;
}

#app {
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh; /* 화면 전체를 덮도록 설정 */
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
