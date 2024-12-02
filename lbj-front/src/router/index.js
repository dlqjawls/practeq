import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/account/LoginView.vue'
import CreateUserView from '@/views/account/CreateUserView.vue'
import RecommendView from '@/views/RecommendView.vue'
import DetailView from '@/views/MovieDetailView.vue'
import { useCounterStore} from '@/stores/counter'
import ChangePasswordView from '@/views/account/ChangePasswordView.vue'
import YoutubeTrailerModal from '@/components/MovieDetailView/YoutubeTrailerModal.vue'
import MovieSearch from '@/components/MovieListView/MovieSearch.vue'
import ProFileView from '@/views/account/ProFileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/createuser',
      name: 'createuser',
      component: CreateUserView,
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: RecommendView,

    },
    {
      path: '/:movieId',
      name: 'movieDetail',
      component: DetailView,
      props: true,
      
    },
    {
      path: '/change',
      name: 'change',
      component: ChangePasswordView,
    },
    {
      path : '/youtubeTrailerModal',
      name : 'youtubeTrailerModal',
      component : YoutubeTrailerModal,
      props: true
    },
    {
      path: '/moviesearch',
      name: 'moviesearch',
      component : MovieSearch,
      
    },
    {
      path:'/profile/:username',
      name:'profile',
      component: ProFileView,
    }
  ],
})


router.beforeEach((to, from) => {
  const store = useCounterStore();

  const protectedRoutes = ['movieDetail', 'recommend'];

  if (protectedRoutes.includes(to.name) && !store.isLogin) {
    window.alert('로그인이 필요합니다.');
    return { name: 'login' };
  }
});

export default router
