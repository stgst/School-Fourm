<template>
  <div class="w-1/6 min-h-screen shadow-md bg-white fixed">
    <div class="p-4">
      <h1 class="text-xl font-bold text-blue-500 mb-4">校園論壇</h1>
      <nav class="space-y-2 text-dark">
        <a href="#" class="flex items-center p-2 hover:bg-gray-100 rounded-md">
          <span class="ml-3"><router-link :to="{ name: 'Home' }">最新文章</router-link></span>
        </a>
        <a href="#" class="flex items-center p-2 hover:bg-gray-100 rounded-md">
          <span class="ml-3"><router-link :to="{ name: 'Home', query: { category: '感情版' } }">感情版</router-link></span>
        </a>
        <a href="#" class="flex items-center p-2 hover:bg-gray-100 rounded-md">
          <span class="ml-3"><router-link :to="{ name: 'Home', query: { category: '學習版' } }">學習版</router-link></span>
        </a>
        <a href="#" class="flex items-center p-2 hover:bg-gray-100 rounded-md">
          <span class="ml-3"><router-link :to="{ name: 'Home', query: { category: '靠北版' } }">靠北版</router-link></span>
        </a>
        <a href="#" class="flex items-center p-2 hover:bg-gray-100 rounded-md">
          <span class="ml-3"><router-link :to="{ name: 'Home', query: { category: '教師版' } }">教師版</router-link></span>
        </a>
        <a href="#" v-if="!isAuthenticated" class="flex items-center p-2  hover:bg-gray-100 rounded-md">
          <span class="ml-3" ><router-link :to="{ name: 'Login' }">登入</router-link></span>
        </a>
        <span class="flex items-center p-2 hover:bg-gray-100 rounded-md ml-3 cursor-pointer" v-if="isAuthenticated" @click="logout">登出</span>
      </nav>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'sidebarComponent',
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.isAuthenticated = true;
      }
    },
    logout() {
      axios.post('http://localhost:3000/api/users/logout', {}, { withCredentials: true })
        .then(response => {
          if (response.data.success) {
            alert('登出成功');
            localStorage.removeItem('user');
            this.$router.go(0);
          } else {
            alert('登出失敗');
          }
        })
        .catch(error => {
          console.error('Error logging out:', error);
        });
    },
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>