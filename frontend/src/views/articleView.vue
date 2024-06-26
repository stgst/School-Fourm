<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-8">
      <h1 class="text-3xl font-bold mb-6">{{ article.title }}</h1>
      <p class="text-gray-500 mb-2">最後編輯時間: {{ formatTime(article.last_edit_time) }}</p>
      <p class="text-gray-500 mb-4">作者: {{ article.author }}</p>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        {{ article.content }}
      </div>
      <div v-if="isAuthor" class="mt-4">
        <router-link :to="'/edit/' + article.id" class="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 mr-2">編輯</router-link>
        <button @click="deleteArticle" class="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700">刪除</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../components/sidebarComponent.vue';

export default {
  name: 'articleView',
  components: { Sidebar },
  data() {
    const userId = localStorage.getItem('user') != null ? JSON.parse(localStorage.getItem('user')).id : null;
    return {
      article: {},
      userId: userId,
    };
  },
  computed: {
    isAuthor() {
      return this.article.user_id === this.userId;
    }
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:3000/api/articles/${id}`)
      .then(response => {
        this.article = response.data.article;
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  },
  methods: {
    formatTime(time) {
      return moment(time).fromNow();
    },
    deleteArticle() {
      const id = this.$route.params.id;
      axios.delete(`http://localhost:3000/api/articles/${id}`, { withCredentials: true })
        .then(response => {
          if (response.data.success) {
            alert('文章刪除成功');
            this.$router.push('/');
          } else {
            alert('文章刪除失敗');
          }
        })
        .catch(error => {
          console.error('Error deleting article:', error);
        });
    }
  },
};
</script>