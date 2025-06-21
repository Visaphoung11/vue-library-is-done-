import { ref, computed, type Ref, type ComputedRef } from "vue";
import type { User } from "../types";

const user: Ref<User | null> = ref(null);
const token: Ref<string | null> = ref(null);
const isAuthenticated: ComputedRef<boolean> = computed(
  () => !!user.value && !!token.value
);

const API_URL = "http://localhost:3000/api/auth/login";

export function useAuth() {
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    console.log("Login attempt with username:", username);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        console.error(`Login failed with status ${response.status}`);
        return false;
      }

      const data = await response.json();

      if (data?.token && data?.user) {
        const userData: User = {
          id: data.user.id.toString(),
          full_name: data.user.full_name,
          username: data.user.username,
          role: data.user.role,
        };

        user.value = userData;
        token.value = data.token;

        localStorage.setItem("library_user", JSON.stringify(userData));
        localStorage.setItem("library_token", data.token);

        return true;
      } else {
        console.error("Invalid login response:", data);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = (): void => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("library_user");
    localStorage.removeItem("library_token");
  };

  const checkAuth = (): void => {
    try {
      const savedUser = localStorage.getItem("library_user");
      const savedToken = localStorage.getItem("library_token");

      if (savedUser && savedToken) {
        user.value = JSON.parse(savedUser) as User;
        token.value = savedToken;
      }
    } catch (error) {
      console.error("Error restoring auth state:", error);
      logout();
    }
  };

  // Auto-restore on first load
  checkAuth();

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };
}
