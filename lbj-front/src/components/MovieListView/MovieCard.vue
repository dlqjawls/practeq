<template>
  <div class="movie-card">
    <router-link :to="{ name: 'movieDetail', params: { movieId: props.movie.id }}" class="movie-link">
      <div class="movie-image">
        <img :src="'http://image.tmdb.org/t/p/w300' + props.movie.poster_path" alt="moviePoster" />
      </div>
    </router-link>
    <div class="movie-details">
      <h2 class="movie-title">{{ props.movie.title }}</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>

.movie-card {
  position: relative;
  background: #181818;  
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  max-width: 280px;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.movie-card:hover {
  transform: scale(1.05); 
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5); 
}


.movie-image {
  width: 100%;
  height: 0;
  padding-bottom: 150%; 
  background: #222; 
  position: relative;
  overflow: hidden;
}

.movie-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .movie-image img {
  transform: scale(1.1); 
}


.movie-details {
  padding: 15px 10px;
  text-align: center;
  background: #202020; 
}

.movie-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #fff;
  margin-bottom: 5px;
  transition: color 0.3s ease;
}

.movie-card:hover .movie-title {
  color: #e50914; 
}


@media (max-width: 768px) {
  .movie-card {
    max-width: 100%;
  }
}
</style>
