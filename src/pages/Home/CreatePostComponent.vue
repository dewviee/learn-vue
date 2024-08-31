<template>
  <div class="create-post-container">
    <textarea
      class="create-post-content"
      :value="content"
      @input="updateValue"
      placeholder="What's on your mind?"
    ></textarea>
    <button class="create-post-button" @click="fetchCreatePost">Post</button>
  </div>
</template>

<script lang="ts">
import api from '@/services/api'
import { apiPathV1 } from '@/services/apiPath'
import type { TApiError } from '@/types/api.type'
import type { TCreatePostRequest, TCreatePostResponse, TPost } from '@/types/post.type'
import type { AxiosError } from 'axios'
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'CreatePostComponent',
  props: {
    content: {
      type: String,
      required: true
    },
    posts: {
      type: Array as PropType<TPost[]>,
      required: true
    }
  },
  emits: ['update:content', 'update:posts'],
  methods: {
    updateValue(event: Event) {
      const input = event.target as HTMLInputElement
      this.$emit('update:content', input.value)
    },
    async fetchCreatePost() {
      if (this.content.length === 0) {
        alert('content could not be empty')
        return
      }

      const payload: TCreatePostRequest = {
        content: this.content
      }

      try {
        const accessToken = localStorage.getItem('accessToken')
        const result = await api.post(apiPathV1.post.createPost, payload, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const resData = result.data as TCreatePostResponse

        const newPost = this.posts
        newPost.unshift(resData.data)

        this.$emit('update:content', '')
        this.$emit('update:posts', newPost)
      } catch (err) {
        const error = err as AxiosError
        const response = error.response?.data as unknown as TApiError

        if (Array.isArray(response.message)) {
          alert(response.message.join('\n'))
        } else if (response.message) {
          alert(response.message)
        } else alert('something went wrong')
      }
    }
  }
})
</script>

<style scoped>
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
