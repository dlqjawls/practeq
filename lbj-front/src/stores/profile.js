// stores/counter.js
import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    username: "사용자 이름",
    profilePicture: null, // 프로필 사진 URL
  }),
});
