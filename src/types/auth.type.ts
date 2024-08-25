export type TLoginRequest = {
  identifier: string
  password: string
}

export type TLoginResponse = {
  accessToken: string
}

export type TRegisterRequest = {
  email: string
  username: string
  password: string
}

export type TRegisterForm = {
  email: string
  username: string
  password: string
  confirmPassword: string
}
