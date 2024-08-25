import type { DefineComponent } from 'vue'

export type TRoute = {
  path: string
  component: DefineComponent<any, any, any>
  public?: boolean
}
