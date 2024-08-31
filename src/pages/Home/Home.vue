<template>
  <NavBar />
  <div class="post-container">
    <CreatePostComponent v-model:content="createContentText" v-model:posts="posts" />
    <PostsComponent
      v-model:posts="posts"
      v-model:isFetching="isFetching"
      v-model:isCooldown="isCooldown"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import PostsComponent from '@/pages/Home/PostComponent/PostsComponent.vue'
import { useFetchPosts } from '@/composables/useFetchPosts'
import CreatePostComponent from '@/pages/Home/PostComponent/CreatePostComponent.vue'

export default defineComponent({
  name: 'HomePage',
  components: { NavBar, PostsComponent, CreatePostComponent },
  setup() {
    const createContentText = ref('')
    const { posts, isFetching, isCooldown, fetchPosts, handleScroll } = useFetchPosts()

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      fetchPosts()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { createContentText, posts, isFetching, isCooldown }
  }
})
</script>

<style scoped>
/* Add styles specific to this component */
h1 {
  color: #42b983;
}

.post-container {
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  gap: 20px;
}
</style>
