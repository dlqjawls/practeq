import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue';
import router from './router';
import 'vuetify/styles'; // Vuetify 스타일
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Vuetify 인스턴스를 생성하고, 다크 테마 설정
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark', // 기본 테마를 다크 모드로 설정
  },
});

const app = createApp(App);
const pinia =  createPinia()
const token = localStorage.getItem('authToken');
if (token) {
  store.commit('setToken', token); // Vuex에 토큰 저장
}
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.use(vuetify); // Vuetify 인스턴스를 앱에 추가
app.mount('#app');
