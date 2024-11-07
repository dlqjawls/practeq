<template>
  <div v-if="showLogo" class="logo-container">
    <transition name="fade" @after-leave="showLogo = false">
      <img :src="logoSrc" alt="Logo" class="logo" />
    </transition>
  </div>
</template>

<script>
export default {
  name: "FadeLogo",
  props: {
    logoSrc: {
      type: String,
      required: true, // 로고 이미지 경로를 필수로 전달받음
    },
    displayDuration: {
      type: Number,
      default: 5000, // 기본값 5초
    },
  },
  data() {
    return {
      showLogo: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showLogo = false;
    }, this.displayDuration);
  },
};
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.logo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
</style>
