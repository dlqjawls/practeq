<template>
  <div class="comment-view">
    <h3>댓글 목록</h3>
    
    <ul v-if="comments.length">
      <li v-for="comment in comments" :key="comment.id" class="comment-item">
        <div class="comment-header">
          <!-- <h3>{{ comment.id? comment.id : no_comment_id }}</h3> -->
          <strong class="comment-user">{{ comment.username }}</strong>
          <span class="timestamp">{{ formatDate(comment.updated_at) }}</span>
          <span v-if="username === comment.username">
            <button class="buttonR" @click="triggerEdit(comment)">수정</button> /
            <button class="buttonD" @click="$emit('deleteComment', comment.id)">삭제</button>
          </span>
        </div>
        <!-- 수정 상태인지 확인 -->
        <p v-if="!comment.isEditing" class="comment-content">{{ comment.content }}</p>
        <div v-else>
          <textarea class="ah-sival" v-model="comment.editingContent" />
          <button class="buttonR" @click="confirmEdit(comment)">저장</button>
          <button class="buttonD" @click="cancelEdit(comment)">취소</button>
        </div>
      </li>
    </ul>
    <p v-else class="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['deleteComment', 'editComment']);

// 수정 모드 활성화
const triggerEdit = (comment) => {
  if (comment.isEditing) {
    cancelEdit(comment);
  } else {
    // 수정할 댓글의 상태 변경
    comment.isEditing = true;
    comment.editingContent = comment.content;
  }
};

// 수정 저장
const confirmEdit = (comment) => {
  emit('editComment', comment.id, comment.editingContent);
  cancelEdit(comment);
};

// 수정 취소
const cancelEdit = (comment) => {
  comment.isEditing = false;
  comment.editingContent = "";
};

// 날짜 포맷
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<style scoped>
.comment-view {
  margin-top: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: Arial, sans-serif;
  color: rgb(17, 5, 5);
}

h3 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  margin-bottom: 15px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.comment-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-user {
  font-weight: bold;
  color: #007BFF;
}

.timestamp {
  font-size: 12px;
  color: #999;
}

.comment-content {
  margin: 0;
  color: #555;
  line-height: 1.5;
}

.no-comments {
  text-align: center;
  color: #666;
  font-size: 14px;
}
.buttonR {
  color: blue;
}
.buttonD {
  color: red;
}
.ah-sival {
  color: black;
}
</style>
