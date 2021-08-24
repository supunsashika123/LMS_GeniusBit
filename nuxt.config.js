export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "GeniusBit",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/vee-validate.js",
    { src: "~/plugins/notifications-ssr", mode: "server" },
    { src: "~/plugins/notifications-client", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/eslint-module"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "http://localhost:4000",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: "data.token",
          maxAge: 999999999,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: { url: "user/signIn", method: "post" },
          user: { url: "user/", method: "get" },
          logout: { url: "user/logout", method: "get" },
        },
      },
    },
    redirect: {
      login: "/",
      logout: "/",
      callback: false,
      home: "/home",
    },
  },
};
