import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';

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

app.use(createPinia());
app.use(router);
app.use(vuetify); // Vuetify 인스턴스를 앱에 추가
app.mount('#app');
