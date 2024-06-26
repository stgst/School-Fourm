<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-8">
      <h1 class="text-3xl font-bold mb-6">編輯文章</h1>
      <form @submit.prevent="editArticle" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">標題</label>
          <input v-model="title" type="text" class="w-full p-3 border rounded-lg" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">內容</label>
          <textarea v-model="content" class="w-full p-3 border rounded-lg"></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">作者</label>
          <input v-model="author" type="text" class="w-full p-3 border rounded-lg" disabled/>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">分類</label>
          <select v-model="category" class="w-full p-3 border rounded-lg">
            <option value="感情版">感情版</option>
            <option value="學習版">學習版</option>
            <option value="靠北版">靠北版</option>
            <option value="教師版">教師版</option>
          </select>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">編輯文章</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/sidebarComponent.vue';

export default {
  name: 'editView',
  components: { Sidebar },
  data() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      title: '',
      content: '',
      author: '',
      userid: user.id,
      category: '感情版',
    };
  },
  created() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:3000/api/articles/${id}`)
      .then(response => {
        const article = response.data.article;
        this.title = article.title;
        this.content = article.content;
        this.author = article.author;
        this.category = article.category;
      })
      .catch(error => {
        console.error('Error fetching article:', error);
      });
  },
  methods: {
    editArticle() {
      const id = this.$route.params.id;
      axios.put(`http://localhost:3000/api/articles/${id}`, {
        title: this.title,
        content: this.content,
        author: this.author,
        category: this.category,
        userId: this.userid
      })
      .then(response => {
        if (response.data.success) {
          alert('文章編輯成功');
          this.$router.push(`/article/${id}`);
        } else {
          alert('文章編輯失敗');
        }
      })
      .catch(error => {
        console.error('Error editing article:', error);
      });
    },
  },
};
</script>