// import { createApp } from 'vue'
import "./style.css";
// import App from './App.vue'

// createApp(App).mount('#app')
// src/main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import './assets/tailwind.css' // Optional: Tailwind CSS

createApp(App).use(router).mount("#app");
