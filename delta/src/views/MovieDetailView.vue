<template>
  <div>
    
    <MovieDetailinfo :movie-id="movieId" />

    <!-- 댓글 작성 폼 -->
    <form @submit.prevent="submitComment" class="comment-form">
      <h3>댓글 작성</h3>
      <div class="textarea-wrapper">
        <textarea
          v-model="content"
          placeholder="댓글을 입력하세요..."
          required
        ></textarea>
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "작성 중..." : "댓글 작성" }}
        </button>
      </div>
    </form>

    <!-- 댓글 리스트 보기 -->
    <CommentView
      :comments="comments"
      :username="store.username"
      @deleteComment="deleteComment"
      @editComment="editComment"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';
import MovieDetailinfo from '@/components/MovieDetailView/MovieDetailinfo.vue';
import CommentView from './CommentView.vue';
import { useCounterStore } from '@/stores/counter';

const store = useCounterStore();

const props = defineProps({
  movieId: {
    type: Object,
    required: true,
  },
});

const content = ref("");
const isSubmitting = ref(false);
const comments = ref([]);

// 댓글 불러오기
const loadComments = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/movies/${props.movieId}/comment/`);
    comments.value = Object.values(response.data); // 서버에서 댓글 리스트를 가져옵니다.
  } catch (error) {
    console.error("댓글 불러오기 중 오류 발생:", error);
  }
};
loadComments();

// 댓글 작성
const submitComment = async () => {
  if (!content.value.trim()) {
    alert("댓글 내용을 입력하세요.");
    return;
  }

  isSubmitting.value = true;

  try {
    const token = JSON.parse(localStorage.getItem('counter')).token;
    const response = await axios.post(
      `http://127.0.0.1:8000/movies/${props.movieId}/comment/`,
      { content: content.value },
      { headers: { Authorization: `Token ${token}` } }
    );
    comments.value.unshift(response.data); // 새 댓글 추가
    content.value = "";
    alert("댓글이 성공적으로 작성되었습니다.");
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
    alert("댓글 작성에 실패했습니다.");
  } finally {
    isSubmitting.value = false;
  }
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  try {
    const token = JSON.parse(localStorage.getItem('counter')).token;
    await axios.delete(`http://127.0.0.1:8000/movies/${props.movieId}/comment/${commentId}/`, {
      headers: { Authorization: `Token ${token}` },
    });
    comments.value = comments.value.filter((comment) => comment.id !== commentId);
    alert("댓글이 삭제되었습니다.");
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    alert("댓글 삭제에 실패했습니다.");
  }
};

// 댓글 수정
const editComment = async (commentId, newContent) => {
  try {
    const token = JSON.parse(localStorage.getItem('counter')).token;
    const response = await axios.put(
      `http://127.0.0.1:8000/movies/${props.movieId}/comment/${commentId}/`,
      { content: newContent },
      { headers: { Authorization: `Token ${token}` } }
    );
    const index = comments.value.findIndex((comment) => comment.id === commentId);
    if (index !== -1) comments.value[index] = response.data;
    alert("댓글이 수정되었습니다.");
  } catch (error) {
    console.error("댓글 수정 중 오류 발생:", error);
    alert("댓글 수정에 실패했습니다.");
  }
};
</script>

<style lang="css" scoped>
.comment-form {
  color: #ada1a1;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
}
h3{margin-top: 10px;
  margin-bottom: 20px;
}
.textarea-wrapper {
  position: relative;
  width: 100%;
}

textarea {
  width: 100%;
  height: 100px;
  /* margin-bottom: 10px; */
  padding: 10px;
  border: 1px solid #615e5e;
  border-radius: 8px;
  font-size: 14px;
  color: white;
  resize: none;
}

button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  padding: 10px 20px;
  background-color: none;
  /* color: white; */
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  color: #ff0050;
  /* transform: scale(1.1); */
  box-shadow: 0 0 20px rgba(229, 9, 20, 1);
}
/* button:disabled {
  background-color: #aaa;
} */
</style>
