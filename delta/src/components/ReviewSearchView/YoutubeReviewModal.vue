<template>
  <div>
    <h1>YoutubeTrailerModal</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import axios from 'axios'

onMounted(async() => {
  await axios({
    method : 'get',
    url : 'https://www.googleapis.com/youtube/v3/search',
    params: {
      "key" : "AIzaSyAdJwJLyhM0xakdgC56UXYPxgHQn13kpYE",
      "part" : "snippet",
      "q" : "korea,"
    },
    // headers : {

    // }
  })
  .then(res=>{
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  })
})
</script>