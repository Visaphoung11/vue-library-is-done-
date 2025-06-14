// // composables/useTheme.ts
// import { ref, computed, watch } from "vue";

// const theme = ref<"light" | "dark">("light");

// export function useTheme() {
//   const toggleTheme = () => {
//     theme.value = theme.value === "light" ? "dark" : "light";
//   };

//   // Sync with DOM and localStorage
//   watch(
//     theme,
//     (newTheme) => {
//       try {
//         const htmlEl = document.documentElement;
//         if (newTheme === "dark") {
//           htmlEl.classList.add("dark");
//         } else {
//           htmlEl.classList.remove("dark");
//         }
//         localStorage.setItem("library_theme", newTheme);
//         console.log("Theme updated:", newTheme);
//       } catch (err) {
//         console.error("Error updating theme:", err);
//       }
//     },
//     { immediate: true }
//   );
//   watch(
//     theme,
//     (newTheme) => {
//       console.log("Theme changed:", newTheme);
//       const html = document.documentElement;
//       if (newTheme === "dark") {
//         html.classList.add("dark");
//         console.log("Added dark class to <html>");
//       } else {
//         html.classList.remove("dark");
//         console.log("Removed dark class from <html>");
//       }
//       localStorage.setItem("library_theme", newTheme);
//     },
//     { immediate: true }
//   );

//   // Load saved theme
//   const savedTheme = localStorage.getItem("library_theme") as "light" | "dark";
//   if (savedTheme && ["light", "dark"].includes(savedTheme)) {
//     theme.value = savedTheme;
//   }

//   return {
//     theme: computed(() => theme.value),
//     toggleTheme,
//   };
// }

import { ref, computed, watch } from "vue";

const theme = ref<"light" | "dark">("light");

export function useTheme() {
  // Toggle theme function
  const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  };

  // Sync theme with DOM and localStorage
  watch(
    theme,
    (newTheme) => {
      try {
        const htmlEl = document.documentElement;
        if (newTheme === "dark") {
          htmlEl.classList.add("dark");
        } else {
          htmlEl.classList.remove("dark");
        }
        localStorage.setItem("library_theme", newTheme);
        console.log("Theme updated to:", newTheme); // For debugging
      } catch (err) {
        console.error("Error updating theme:", err);
      }
    },
    { immediate: true } // Run immediately to apply saved theme
  );

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("library_theme");
  if (savedTheme && ["light", "dark"].includes(savedTheme)) {
    theme.value = savedTheme as "light" | "dark";
  }

  return {
    theme: computed(() => theme.value),
    toggleTheme,
  };
}
