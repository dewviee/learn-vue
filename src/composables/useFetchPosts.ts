import { ref } from 'vue'
import api from '@/services/api'
import { apiPathV1 } from '@/services/apiPath'
import type { FetchPostsConfig, TPost, TPostRequest, TPostResponse } from '@/types/post.type'
import { getScrollPercentage, scrollToPercentage } from '@/utils/scroll'

/**
 * @param config.firstFetchQuantity item when fetch at first time page load
 * @param config.eachTimeQuantity item quantity every fetch to get post
 * @param config.fetchCoolDown cool down time in "seconds" before can fetch again.
 */
export function useFetchPosts(
  config: FetchPostsConfig = {
    firstFetchQuantity: 5,
    eachTimeQuantity: 3,
    fetchCoolDown: 3
  }
) {
  const posts = ref<TPost[]>([])
  const isFetching = ref(false)

  async function fetchPosts() {
    if (isFetching.value) return

    isFetching.value = true

    const latestLoadID = posts.value.length > 0 ? posts.value[posts.value.length - 1].id : undefined
    const quantity = posts.value.length === 0 ? config.firstFetchQuantity : config.eachTimeQuantity

    const payload: TPostRequest = {
      orderBy: 'DESC',
      quantity: quantity,
      latestLoadID: latestLoadID
    }

    const accessToken = localStorage.getItem('accessToken')
    try {
      const result = await api.get(apiPathV1.post.getPosts, {
        params: payload,
        headers: { Authorization: `Bearer ${accessToken}` }
      })

      const response: TPostResponse = result.data

      response.data = response.data.map((post) => {
        post.createdAt = new Date(post.createdAt)
        post.updatedAt = new Date(post.updatedAt)
        return post
      })

      if (response.data.length > 0) {
        posts.value = [...posts.value, ...response.data]
      }

      let counter = config.fetchCoolDown
      const intervalID = window.setInterval(() => {
        if (counter > 0) counter--
        else {
          clearInterval(intervalID)
          isFetching.value = false
        }
      }, 1000)
    } catch (err) {
      console.log(err)
      alert('Something went wrong when fetching')
      isFetching.value = false
    }
  }

  function handleScroll() {
    const scrollPercentage = getScrollPercentage()

    if (scrollPercentage > 99) {
      fetchPosts()

      scrollToPercentage(99, 'instant')
    }
  }

  return { posts, fetchPosts, handleScroll }
}
