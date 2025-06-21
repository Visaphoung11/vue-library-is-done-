```vue
<template>
  <main class="flex-1 p-4 sm:p-8 bg-white min-h-screen mt-0">
    <!-- Header -->
    <h1
      class="text-2xl sm:text-3xl font-semibold text-gray-800 animate-fade-in"
    >
      {{ t("nav.books") }}
    </h1>
    <p class="text-gray-500 mb-4 sm:mb-6">
      {{ t("books.overview") }}
    </p>

    <!-- Add Book Button -->
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-lg sm:text-xl font-semibold text-gray-800 animate-fade-in"
      >
        {{ t("books.title") }}
      </h2>
      <button
        @click="openAddModal"
        class="px-4 sm:px-5 py-1 sm:py-2 border border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-300"
      >
        New
      </button>
    </div>

    <!-- Modal for Adding/Editing Book -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg animate-form-slide"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          {{ editingBook ? t("books.edit") : t("books.add") }}
        </h3>
        <form @submit.prevent="submitBook">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                t("books.fields.title")
              }}</label>
              <input
                v-model="newBook.title"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                @input="validateForm"
              />
              <p v-if="errors.title" class="text-red-500 text-xs mt-1">
                {{ errors.title }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                t("books.fields.description")
              }}</label>
              <textarea
                v-model="newBook.description"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                rows="4"
                @input="validateForm"
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-xs mt-1">
                {{ errors.description }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">{{
                t("books.fields.author_id")
              }}</label>
              <input
                v-model.number="newBook.author_id"
                type="number"
                min="1"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                @input="validateForm"
              />
              <p v-if="errors.author_id" class="text-red-500 text-xs mt-1">
                {{ errors.author_id }}
              </p>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            >
              {{ t("books.cancel") }}
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            >
              {{ editingBook ? t("books.update") : t("books.add") }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Books Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs sm:text-sm">
        <thead>
          <tr class="bg-slate-800 text-white text-left">
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.no") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.title") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.description") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.author_id") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.created_by") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.add") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.edit") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.delete") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(book, index) in books"
            :key="book.id"
            :class="[
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
              'animate-row-slide',
              'hover:bg-gray-100 transition-colors duration-200',
              clickedRow === index ? 'bg-blue-100' : '',
            ]"
            @click="handleRowClick(index)"
          >
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ index + 1 }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.title }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.description }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.author_id }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.created_by }}
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="openAddModal"
                class="bg-orange-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                {{ t("books.add") }}
              </button>
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="openEditModal(index)"
                class="bg-blue-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
              >
                {{ t("books.edit") }}
              </button>
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="deleteBook(index)"
                class="bg-red-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
              >
                {{ t("books.delete") }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4 sm:mt-6 space-x-2 sm:space-x-3">
      <button
        v-for="page in 3"
        :key="page"
        class="border px-3 sm:px-4 py-1 sm:py-2 text-blue-600 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors duration-300"
      >
        {{ page }}
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

interface Book {
  id: string;
  title: string;
  description: string;
  author_id: number;
  created_by: number;
}

const { t } = useLanguage();
const toast = useToast();
const router = useRouter();
const { token, isAuthenticated, user } = useAuth();

const API_URL = "http://localhost:3000/api/books";

const books = ref<Book[]>([]);
const newBook = ref<Partial<Book>>({
  title: "",
  description: "",
  author_id: undefined,
});
const errors = ref<Partial<Record<keyof Book, string>>>({
  title: "",
  description: "",
  author_id: "",
});
const showModal = ref(false);
const clickedRow = ref<number | null>(null);
const editingBook = ref<Book | null>(null);
const isFormValid = ref(false);

// Fetch books from API
const fetchBooks = async () => {
  if (!isAuthenticated.value || !token.value) {
    toast.error(t("auth.login_required"));
    router.push("/login");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    books.value = data.map((book: any) => ({
      id: book.id.toString(),
      title: book.title,
      description: book.description,
      author_id: book.author_id,
      created_by: book.created_by,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    toast.error(t("books.fetch_failed"));
  }
};

// Validate form inputs
const validateForm = () => {
  errors.value = {
    title: newBook.value.title
      ? books.value.some(
          (b) =>
            b.title === newBook.value.title &&
            b.id !== (editingBook.value?.id || "")
        )
        ? t("books.errors.title_unique")
        : ""
      : t("books.errors.title_required"),
    description: newBook.value.description
      ? ""
      : t("books.errors.description_required"),
    author_id:
      newBook.value.author_id && newBook.value.author_id > 0
        ? ""
        : t("books.errors.author_id_required"),
  };

  isFormValid.value = Object.values(errors.value).every((error) => !error);
};

// Open modal for adding a new book
const openAddModal = () => {
  editingBook.value = null;
  newBook.value = {
    title: "",
    description: "",
    author_id: undefined,
  };
  errors.value = {
    title: "",
    description: "",
    author_id: "",
  };
  isFormValid.value = false;
  showModal.value = true;
};

// Open modal for editing a book
const openEditModal = (index: number) => {
  editingBook.value = { ...books.value[index] };
  newBook.value = {
    title: editingBook.value.title,
    description: editingBook.value.description,
    author_id: editingBook.value.author_id,
  };
  validateForm();
  showModal.value = true;
};

// Submit book (create only, as API doesn't support update)
const submitBook = async () => {
  if (!isFormValid.value) return;

  if (!isAuthenticated.value || !token.value || !user.value) {
    toast.error(t("auth.login_required"));
    router.push("/login");
    return;
  }

  try {
    const payload = {
      title: newBook.value.title,
      description: newBook.value.description,
      author_id: newBook.value.author_id,
      created_by: parseInt(user.value.id),
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    toast.success((result.message || t("books.created")) + " successfully!");

    await fetchBooks();

    newBook.value = {
      title: "",
      description: "",
      author_id: undefined,
    };
    showModal.value = false;
    editingBook.value = null;
  } catch (error) {
    console.error("Error creating book:", error);
    toast.error(t("books.create_failed"));
  }
};

// Delete book (not implemented in API, keeping local deletion as fallback)
const deleteBook = (index: number) => {
  books.value.splice(index, 1);
  toast.success(t("books.deleted"));
};

// Handle row click for visual feedback
const handleRowClick = (index: number) => {
  clickedRow.value = index;
  setTimeout(() => {
    clickedRow.value = null;
  }, 300);
};

onMounted(fetchBooks);
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-form-slide {
  animation: slide-in 0.6s ease-out;
}

.animate-row-slide {
  animation: slide-in 0.4s ease-out;
}

/* Ensure table is responsive */
table {
  width: 100%;
  table-layout: auto;
}

/* Improve readability on small screens */
@media (max-width: 640px) {
  table {
    font-size: 0.75rem;
  }
  th,
  td {
    min-width: 80px;
  }
}

/* Custom backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
