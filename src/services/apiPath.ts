export const apiPathV1 = {
  auth: {
    login: '/v1/auth/login',
    logout: '/v1/auth/logout',
    register: '/v1/auth/register',
    refreshAccessToken: '/v1/auth/refresh-access-token'
  },
  user: {
    getUserProfile: '/v1/user/profile'
  },
  post: {
    getPosts: '/v1/post'
  }
}
