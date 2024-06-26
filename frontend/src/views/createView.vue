<template>
  <div class="flex">
    <Sidebar />
    <div class="ml-64 p-8">
      <h1 class="text-3xl font-bold mb-6">新增文章</h1>
      <form @submit.prevent="createArticle" class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
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
          <input v-model="author" :placeholder="author" type="text" class="w-full p-3 border rounded-lg" disabled/>
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
        <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">新增文章</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '../components/sidebarComponent.vue';

export default {
  name: 'createView',
  components: { Sidebar },
  data() {
    const user = JSON.parse(localStorage.getItem('user'));
    return {
      title: '',
      content: '',
      author: user.username,
      userid: user.id,
      category: '感情版',
    };
  },
  methods: {
    createArticle() {
      axios.post('http://localhost:3000/api/articles', {
        title: this.title,
        content: this.content,
        author: this.author,
        category: this.category,
        userId: this.userid
      })
      .then(response => {
        if (response.data.success) {
          alert('文章新增成功');
          this.$router.push('/');
        } else {
          alert('文章新增失敗');
        }
      })
      .catch(error => {
        console.error('Error creating article:', error);
      });
    },
  },
};
</script>