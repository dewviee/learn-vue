<template>
  <NavBar />
  <div class="post-container">
    <div class="create-post-container">
      <textarea
        class="create-post-content"
        v-model="createContentText"
        placeholder="What's on your mind?"
      ></textarea>
      <button class="create-post-button">Post</button>
    </div>
    <PostsComponent v-model:posts="posts" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import PostsComponent from '@/components/PostsComponent.vue'
import { useFetchPosts } from '@/composables/useFetchPosts'

export default defineComponent({
  name: 'HomePage',
  components: { NavBar, PostsComponent },
  setup() {
    const createContentText = ref('')
    const { posts, fetchPosts, handleScroll } = useFetchPosts()

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      fetchPosts()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return { createContentText, posts }
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

.create-post-container {
  display: flex;
  flex-direction: column; /* Arrange items vertically */
  align-items: center; /* Center items horizontally */
  gap: 10px;
}

.create-post-content {
  width: 300px; /* Width of the textarea */
  padding: 10px; /* Padding inside the textarea */
  border: 1px solid #ccc; /* Border of the textarea */
  border-radius: 4px; /* Rounded corners */
  resize: vertical; /* Disable manual resizing */
  overflow-y: hidden; /* Hide vertical scrollbar */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}

.create-post-button {
  padding: 8px 16px; /* Padding inside the button */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  background-color: #007bff; /* Button background color */
  color: white; /* Button text color */
  cursor: pointer; /* Pointer cursor on hover */
}

.create-post-button:hover {
  background-color: #0056b3; /* Darker background on hover */
}
</style>
