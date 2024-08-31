export type TPost = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  user: {
    username: string
  }
}

export type TPostRequest = {
  orderBy: 'ASC' | 'DESC'
  latestLoadID?: string
  quantity: number
}

export type TPostResponse = {
  data: TPost[]
}

export type FetchPostsConfig = {
  firstFetchQuantity: number
  eachTimeQuantity: number
  fetchCoolDown: number
}

export type TCreatePostRequest = {
  content: string
}

export type TCreatePostResponse = {
  data: TPost
}
