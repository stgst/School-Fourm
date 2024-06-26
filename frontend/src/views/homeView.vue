<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-8 relative">
      <div class="flex justify-between items-center mb-6">
      </div>
      <div v-for="article in articles" :key="article.id" class="mb-6 p-6 border rounded-lg shadow-lg bg-white">
        <h2 class="text-2xl font-semibold mb-2">{{ article.title }}</h2>
        <p class="text-gray-500 mb-2">最後編輯時間: {{ formatTime(article.last_edit_time) }}</p>
        <p class="text-gray-500 mb-4">作者: {{ article.author }}</p>
        <router-link :to="'/article/' + article.id" class="text-blue-600 hover:underline">閱讀更多</router-link>
      </div>
      <router-link v-if="isAuthenticated" to="/create" class="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
        <font-awesome-icon :icon="['fas', 'plus-circle']" size="2x" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Sidebar from '../components/sidebarComponent.vue';

export default {
  name: 'homeView',
  components: { Sidebar },
  data() {
    return {
      articles: [],
      isAuthenticated: false
    };
  },
  watch: {
    '$route.query.category': 'fetchArticles'
  },
  created() {
    this.fetchArticles();
    this.checkAuth()
  },
  methods: {
    fetchArticles() {
      const category = this.$route.query.category;
      let url = 'http://localhost:3000/api/articles';
      if (category) {
        url += `?category=${category}`;
      }
      axios.get(url)
        .then(response => {
          this.articles = response.data.articles;
        })
        .catch(error => {
          console.error('Error fetching articles:', error);
        });
    },

    formatTime(time) {
      return moment(time).fromNow();
    },

    checkAuth() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.isAuthenticated = true;
      }
    },
  },
};
</script>