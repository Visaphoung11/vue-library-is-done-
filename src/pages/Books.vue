<template>
  <main class="flex-1 p-4 sm:p-8 bg-white min-h-screen mt-0">
    <!-- Header -->
    <h1
      class="text-2xl sm:text-3xl font-semibold text-gray-800 animate-fade-in"
    >
      Books Management
    </h1>
    <p class="text-gray-500 mb-4 sm:mb-6">Manage your library books</p>

    <!-- Add Book Button -->
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-lg sm:text-xl font-semibold text-gray-800 animate-fade-in"
      >
        Books List
      </h2>
      <button
        @click="showModal = true"
        class="px-4 sm:px-5 py-1 sm:py-2 border border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-300"
      >
        New
      </button>
    </div>

    <!-- Modal for Adding Book -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg animate-form-slide"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Book</h3>
        <form @submit.prevent="addBook">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Title</label
              >
              <input
                v-model="newBook.title"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Author</label
              >
              <input
                v-model="newBook.author"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Category</label
              >
              <input
                v-model="newBook.category"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
            >
              Add Book
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
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">No</th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Title
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Author
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Category
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Available
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Add
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Delete
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
              {{ book.author }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.category }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ book.available ? "Yes" : "No" }}
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="showModal = true"
                class="bg-orange-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                Add
              </button>
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="deleteBook(index)"
                class="bg-red-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
              >
                Delete
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
import { ref } from "vue";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
}

const books = ref<Book[]>([
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    available: true,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    available: false,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    available: true,
  },
]);

const newBook = ref<Omit<Book, "id" | "available">>({
  title: "",
  author: "",
  category: "",
});

const showModal = ref(false);
const clickedRow = ref<number | null>(null);

const addBook = () => {
  const id = `${books.value.length + 1}-${Math.floor(Math.random() * 1000)}`;
  books.value.push({ ...newBook.value, id, available: true });
  newBook.value = { title: "", author: "", category: "" };
  showModal.value = false;
};

const deleteBook = (index: number) => {
  books.value.splice(index, 1);
};

const handleRowClick = (index: number) => {
  clickedRow.value = index;
  setTimeout(() => {
    clickedRow.value = null;
  }, 300); // Reset after 300ms for visual feedback
};
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
    font-size: 0.75rem; /* Smaller text on mobile */
  }
  th,
  td {
    min-width: 80px; /* Prevent columns from collapsing too much */
  }
}

/* Custom backdrop blur for Tailwind */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px); /* For Safari compatibility */
}
</style>
