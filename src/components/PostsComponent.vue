<template>
  <div class="post-item-container">
    <div v-for="(post, i) in posts" :key="post.id" class="post">
      <div class="post-header">
        <span class="post-username">{{ post.id }}</span>
        <span class="post-created-at">{{ formattedDates[i] }}</span>
      </div>
      <div class="post-content">
        {{ post.content }}
      </div>
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

    return { formattedDates }
  },
  props: {
    posts: {
      type: Array as PropType<TPost[]>,
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
  width: 500px; /* Increased width */
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px; /* Increased padding */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header,
.post-footer {
  display: flex;
  align-items: center;
  gap: 5px; /* Space between username and date */
}

.post-username {
  font-weight: bold;
  font-size: 16px;
}

.post-created-at {
  font-size: 10px;
}

.post-content {
  font-size: 16px;
  line-height: 1.5;
  text-align: left;
}
</style>
