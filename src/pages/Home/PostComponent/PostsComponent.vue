<template>
  <div class="post-item-container">
    <div v-for="(post, i) in posts" :key="post.id" class="post">
      <div class="post-header">
        <span class="post-username">{{ post.user.username }}</span>
        <span class="post-created-at">
          {{ formattedDates[i] }}
          <span class="tooltip">{{ dayjs(post.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </span>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
    </div>
    <div style="margin-bottom: 50px">
      <div v-if="isCooldown || isFetching" class="loader"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { type TPost } from '@/types/post.type'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'PostsComponent',
  setup(props) {
    const formattedDates = computed(() => {
      const now = dayjs()
      return props.posts.map((post) => {
        const createdAt = dayjs(post.createdAt)

        if (createdAt.isBefore(now.subtract(1, 'day'))) {
          const [year, month, day] = [
            now.diff(createdAt, 'years'),
            now.diff(createdAt, 'months') % 12,
            now.diff(createdAt, 'days')
          ]
          if (year) return `${year} years`
          if (month) return `${month} month`
          if (day) return `${day} day`
        }

        const [hour, min, sec] = [
          now.diff(createdAt, 'hours'),
          now.diff(createdAt, 'minutes') % 60,
          now.diff(createdAt, 'seconds') % 60
        ]
        if (hour) return `${hour} hours`
        if (min) return `${min} minutes`
        if (sec) return `${sec} seconds`
        return 'a few seconds ago'
      })
    })

    return { formattedDates, dayjs }
  },
  props: {
    posts: {
      type: Array as PropType<TPost[]>,
      required: true
    },
    isFetching: {
      type: Boolean,
      required: true
    },
    isCooldown: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style scoped>
.post-item-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.post {
  width: 500px;
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  gap: 5px;
}

.post-username {
  font-size: 16px;
  font-weight: bold;
}

.post-created-at {
  font-size: 8px;
  position: relative;
}

.post-created-at:hover {
  cursor: pointer;
}

.tooltip {
  visibility: hidden;
  width: max-content;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%; /* Position above the text */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  white-space: nowrap; /* Prevent tooltip text from wrapping */
}

.post-created-at:hover .tooltip {
  visibility: visible;
  opacity: 1;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
  word-wrap: break-word;
}

.loader {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
