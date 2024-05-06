## Create New Project

Create new project using below command
```shell
npx nuxi@latest init nuxt-todo-app
cd nuxt-todo-app
npm run dev
```

### Configuration
Add configuration for assets and scss
```js
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": "/<srcDir>",
    "@@": "/<rootDir>",
    assets: "/<srcDir>/assets",
    public: "/<srcDir>/public",
  },
  css: ["/assets/scss/app.scss"],
});
```
### Add Tailwind
```shell
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```
nuxt.config.js
```js
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": "/<srcDir>",
    "@@": "/<rootDir>",
    assets: "/<srcDir>/assets",
    public: "/<srcDir>/public",
  },
  css: ["/assets/scss/app.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
```
tailwind.config.js
```js
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
app.scss
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Nuxt Pages
Pages represent views for each specific route pattern. Every file in the pages/ directory represents a different route displaying its content.

To use pages, create pages/index.vue file and add `<NuxtPage />` component to the app.vue (or remove app.vue for default entry). You can now create more pages and their corresponding routes by adding new files in the pages/ directory.

### app.vue

By default, Nuxt will treat this file as the entrypoint and render its content for every route of the application.

```js
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```
## Layouts
Layouts are wrappers around pages that contain a common User Interface for several pages, such as a header and footer display. Layouts are Vue files using <slot /> components to display the page content. The layouts/default.vue file will be used by default. Custom layouts can be set as part of your page metadata.

## Assets
Nuxt uses two directories to handle assets like stylesheets, fonts or images.
The public/ directory content is served at the server root as-is.
The assets/ directory contains by convention every asset that you want the build tool (Vite or webpack) to process.

### Public Directory
The `public/` directory is used as a public server for static assets publicly available at a defined URL of your application.
You can get a file in the `public/` directory from your application's code or from a browser by the root URL `/`.

**Example**

For example, referencing an image file in the public/img/ directory, available at the static URL /img/nuxt.png:

```js
<template>
  <img src="/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```

### Assets Directory
By convention, Nuxt uses the `assets/` directory to store these files but there is no auto-scan functionality for this directory, and you can use any other name for it.

In your application's code, you can reference a file located in the `assets/` directory by using the `~/assets/` path.

```js
<template>
  <img src="~/assets/img/nuxt.png" alt="Discover Nuxt 3" />
</template>
```
## Styling
Nuxt is highly flexible when it comes to styling. Write your own styles, or reference local and external stylesheets. You can use CSS preprocessors, CSS frameworks, UI libraries and Nuxt modules to style your application.

**Importing Within Components**
```js
<script>
// Use a static import for server-side compatibility
import '~/assets/css/first.css'

// Caution: Dynamic imports are not server-side compatible
import('~/assets/css/first.css')
</script>

<style>
@import url("~/assets/css/second.css");
</style>
```

**External Stylesheets**
```js
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }]
    }
}})
```
**Class And Style Bindings**
```js
<script setup lang="ts">
const isActive = ref(true)
const hasError = ref(false)
const classObject = reactive({
  active: true,
  'text-danger': false
})
</script>

<template>
  <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="classObject"></div>
</template>
```
**Dynamic Styles With v-bind**
```js
<script setup lang="ts">
const color = ref("red")
</script>

<template>
  <div class="text">hello</div>
</template>

<style>
.text {
  color: v-bind(color);
}
</style>
```
**Scoped Styles**
```js
<template>
  <div class="example">hi</div>
</template>

<style scoped>
.example {
  color: red;
}
</style>
```

## Routing
Nuxt routing is based on vue-router and generates the routes from every component created in the pages/ directory, based on their filename.

```md
| pages/
---| about.vue
---| index.vue
---| posts/
-----| [id].vue
```
### Navigation

The `<NuxtLink>` component links pages between them. It renders an `<a>` tag with the href attribute set to the route of the page.

```js
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template
```
### Route Parameters

The `useRoute()` composable can be used in a `<script setup>` block or a `setup()` method of a Vue component to access the current route details.

```js
<script setup lang="ts">
const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>
```
### Route Middleware

Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

There are three kinds of route middleware:
1. Anonymous (or inline) route middleware, which are defined directly in the pages where they are used.

2. Named route middleware, which are placed in the `middleware/` directory and will be automatically loaded via asynchronous import when used on a page. (Note: The route middleware name is normalized to kebab-case, so `someMiddleware` becomes `some-middleware`.)
3. Global route middleware, which are placed in the `middleware/` directory (with a `.global` suffix) and will be automatically run on every route change.

Example of an `auth` middleware protecting the `/dashboard` page:

**middleware/auth.ts**
```js
function isAuthenticated(): boolean { return false }
// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
```
**pages/dashboard.vue**
```js
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <h1>Welcome to your dashboard</h1>
</template>
```

### Route Validation

Nuxt offers route validation via the `validate` property in `definePageMeta()` in each page you wish to validate.

The `validate` property accepts the `route` as an argument. You can return a boolean value to determine whether or not this is a valid route to be rendered with this page. If you return `false`, and another match can't be found, this will cause a 404 error. You can also directly return an object with `statusCode/statusMessage` to respond immediately with an error (other matches will not be checked).

If you have a more complex use case, then you can use anonymous route middleware instead.

**pages/posts/[id].vue**
```js
<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // Check if the id is made up of digits
    return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
  }
})
</script>
```
## Components
In Nuxt, you can create these components in the `components/` directory, and they will be automatically available across your application without having to explicitly import them.

**components/AppAlert.vue**
```js
<template>
  <span>
    <slot />
  </span>
</template>
```

### Example

**Alert.vue**
```js
<template lang="">
  <div
    class="p-4 mb-4 text-sm text-green-800 rounded-lg dark:bg-gray-800 dark:text-green-400"
    role="alert"
    :class="{
      'text-green-800 bg-green-50': type === 'success',
      'text-red-800 bg-red-50': type === 'error',
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    type: "success",
  },
};
</script>
```
**index.vue**

```js
<template lang="">
  <div>Vue welcome page</div>
  <Alert type="error"
    ><span class="font-medium">Success alert!</span> Change a few things up and
    try submitting again.
  </Alert>
</template>
```

## Composables
Nuxt.js composables are a powerful feature that allows you to encapsulate and share logic across your components in a reusable manner. Composables are functions that return data, methods, or computed properties, making them ideal for managing complex logic related to data fetching, state management, and more.

### Example

**composables/useUtils.ts**
```ts
export const useUtils = () => {
  const sayHello = () => console.log("Hello from useUtils");
  return {
    sayHello,
  };
};
```
**index.vue**
```js
<script setup>
const { sayHello } = useUtils();
sayHello();
</script>
```


## Nuxi Commands
```shell
npx nuxi add layout custom
npx nuxi add component TheHeader
npx nuxi add composable foo
npx nuxi add page about
npx nuxi add page "category/[id]"
npx nuxi add plugin analytics
npx nuxi add middleware auth
npx nuxi add api hello
```

## SEO and Meta



