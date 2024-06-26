<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-8">
      <h1 class="text-3xl font-bold mb-6">登入或註冊</h1>
      <form @submit.prevent="login" class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">用戶名</label>
          <input v-model="username" type="text" class="w-full p-3 border rounded-lg" required />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">密碼</label>
          <input v-model="password" type="password" class="w-full p-3 border rounded-lg" required />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">登入/註冊</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/sidebarComponent.vue';

export default {
  name: 'loginView',
  components: { Sidebar },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      if (this.username && this.password) {
        try {
          var response = await axios.post('http://localhost:3000/api/users/login', {
            username: this.username,
            password: this.password
          }, { withCredentials: true });

          if (response.data.success == false) {
            alert('登入失敗，請換一個使用者名稱或檢查密碼。');
          } else {
            localStorage.setItem('user', JSON.stringify(response.data));
            alert('登入成功')
            this.$forceUpdate();
            this.$router.push('/');
          }

        } catch (error) {
          console.error('Error login:', error.response.data.error);
          alert('登入失敗。');
        }
      }
    },
  },
};
</script>