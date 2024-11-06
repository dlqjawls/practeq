<template>
  <div id="app">
    <!-- FadeLogo 컴포넌트를 제외한 불필요한 부분 삭제 -->
    <FadeLogo logoSrc="src/assets/입장.gif" :displayDuration="5000" />
  </div>
</template>

<script>
import FadeLogo from './components/FadeLogo.vue';

export default {
  components: {
    FadeLogo,
  },
};
</script>

<style>
/* 불필요한 스타일이 있으면 삭제 */
</style>
