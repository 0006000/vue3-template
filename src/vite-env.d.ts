/// <reference types="vite/client" />
export {}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}
