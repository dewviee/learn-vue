export type TPost = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
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
}
