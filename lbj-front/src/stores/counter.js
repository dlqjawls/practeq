import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import axios from 'axios';

export const useCounterStore = defineStore('counter', () => {
  const router = useRouter();

  // 상태 정의
  const token = ref(null);
  const username = ref(null);

  const counterData = JSON.parse(localStorage.getItem('counter'))

  // 회원가입 함수
  const signUp = function (payload) {
    const { username: user, password1, password2 } = payload;

    axios({
      method: 'post',
      url: `http://3.36.40.72:8000/dj-rest-auth/registration/`,
      data: {
        username: user,
        password1,
        password2,
      },
    })
      .then((res) => {
        const password = password1;
        logIn({ username: user, password });
        console.log('회원가입 완료되었습니다.');
      })
      .catch((err) => console.log(err));
  };

  // 로그인 함수
  const logIn = function (payload) {
    const { username: user, password } = payload;

    

    axios({
      method: 'post',
      url: `http://3.36.40.72:8000/dj-rest-auth/login/`,
      data: {
        username: user,
        password,
      },
    })
      .then((res) => {
        token.value = res.data.key;
        username.value = user; 
        console.log('로그인 성공:', token.value);
        router.push({ name: 'home' });
        

      })
      .catch((err) => {console.log(err)
        alert('로그인정보가 일치하지 않습니다!')
      })
    }
  // 로그아웃 함수
  const logOut = function () {
    axios({
      method: 'post',
      url: `http://3.36.40.72:8000/dj-rest-auth/logout/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
      .then(() => {
        token.value = null; 
        username.value = null; 
        console.log('로그아웃 성공');
        router.push({ name: 'login' }); 
      })
      .catch((err) => console.log(err));
  };
  const deleteAccount= function(){
    axios({
      method: 'delete',
      url: `http://3.36.40.72:8000/accounts/`,
      headers: {
        Authorization: `Token ${token.value}`,
      },
    })
      .then(() => {
        token.value = null; // 토큰 초기화
        username.value = null; // 사용자 이름 초기화
        console.log('회원탈퇴 성공');
        router.push({ name: 'login' })
        delete counterData.token
        delete counterData.username
        localStorage.setItem('counter', JSON.stringify(counterData))
        localStorage.removeItem('counter')
        localStorage.clear()
        
        })
      .catch((err) => console.log(err))
  }; 

  // 비밀번호 변경 처리 함수 (then/catch 사용)
  const changePassword = (payload) => {
    const oldPassword = payload.oldPassword
    const newPassword1 = payload.newPassword1
    const newPassword2 = payload.newPassword2
    // 비밀번호 일치 여부 확인
    if (newPassword1.value !== newPassword2.value) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 변경 요청
    axios.post('http://3.36.40.72:8000/dj-rest-auth/password/change/', {
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2,
      
    },{
      headers: {
        Authorization:  `Token ${token.value}`,
        "Content-Type" : "application/json",
      },
  })
    .then(response => {
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // 비밀번호 초기화
      oldPassword.value = '';
      newPassword1.value = '';
      newPassword2.value = '';
      // 나중에 route로 redirect를 하게 되면 굳이 없어도 되는 코드
    })
    .catch(error => {
      console.error(error);
      alert('비밀번호 변경에 실패했습니다.');
      console.log("Token: ", token.value);

      router.push({name:'home'})
    });
  };
  
  // 로그인 여부 계산
  const isLogin = computed(() => token.value !== null);



  // 반환
  return { signUp, logIn, logOut, isLogin, token, username,
    deleteAccount,
    changePassword,};
},{persist : true});
