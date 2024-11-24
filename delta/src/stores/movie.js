import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from 'axios';

export const useMovieStore = defineStore('movie', () => {
  const movieList = ref([]);

  const movieDetail = async (movieId) => {
    try {
      console.log('movieList:', movieList.value); // movieList 내용 출력

      const movie = movieList.value.find(movie => movie.id === movieId);
      if (movie) {
        console.log('찾은 영화:', movie); // 찾은 영화 정보 출력
        return movie;
      }

      // 영화 목록에 없는 경우 API에서 데이터 가져오기
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
        }
      });
      console.log('API로 가져온 영화 정보:', res.data); // API 결과 출력
      return res.data;
    } catch (error) {
      console.error('영화 정보를 불러오는 데 실패했습니다:', error);
      return null;
    }
  };

  const getMovie = async () => {
    try {
      const res = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=ko-KR&page=1', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
        }
      });
      movieList.value = res.data.results;
      console.log('영화 목록 불러옴:', movieList.value); // 영화 목록 로드 확인
    } catch (error) {
      console.error('영화 목록을 불러오는 데 실패했습니다:', error);
    }
  };

  // 예고편 ID 가져오는 메서드
  const getTrailerId = async (movieId) => {
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRhYjc1NzFmZmVjYmIzZTVmZDkwNzA4MjZiNWMxNSIsIm5iZiI6MTczMTYzMDA3OC41NTc4MDE3LCJzdWIiOiI2NzM2OTMyN2ZmODU4ODEzOTNhMGMzM2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zBCTehBLSgMgClW3JoO5ujMwpWQCV5pPbiQpS8xK0vs'
        }
      });
      // 예고편 정보가 있을 경우 첫 번째 예고편 키를 반환
      if (res.data.results.length > 0) {
        return res.data.results[0].key;
      } else {
        console.error('예고편을 찾을 수 없습니다.');
        return '';
      }
    } catch (error) {
      console.error('예고편을 불러오는 데 실패했습니다:', error);
      return '';
    }
  };

  return {
    movieList,
    movieDetail,
    getMovie,
    getTrailerId  // 예고편 ID를 반환하는 메서드만 반환
  };
});
