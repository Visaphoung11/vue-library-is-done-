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
