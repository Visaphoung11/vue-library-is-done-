<template>
  <main class="flex-1 p-6 bg-white dark:bg-gray-900 min-h-screen mt-16">
    <!-- Header -->
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Books Management
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Manage your library books
    </p>

    <!-- Add Book Form -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Books List
      </h2>
      <button
        @click="showForm = !showForm"
        class="px-4 py-1 border border-black dark:border-gray-600 rounded text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {{ showForm ? "Cancel" : "New" }}
      </button>
    </div>

    <!-- Form (shown when showForm is true) -->
    <form
      v-if="showForm"
      @submit.prevent="addBook"
      class="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Title</label
          >
          <input
            v-model="newBook.title"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Author</label
          >
          <input
            v-model="newBook.author"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Category</label
          >
          <input
            v-model="newBook.category"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex items-end">
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Add Book
          </button>
        </div>
      </div>
    </form>

    <!-- Books Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="bg-[#0a1c3e] text-white text-left">
            <th class="px-4 py-2">No</th>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Author</th>
            <th class="px-4 py-2">Category</th>
            <th class="px-4 py-2">Available</th>
            <th class="px-4 py-2">Add</th>
            <th class="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(book, index) in books"
            :key="book.id"
            :class="
              index % 2 === 0
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-100 dark:bg-gray-700'
            "
          >
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ book.title }}</td>
            <td class="px-4 py-2">{{ book.author }}</td>
            <td class="px-4 py-2">{{ book.category }}</td>
            <td class="px-4 py-2">{{ book.available ? "Yes" : "No" }}</td>
            <td class="px-4 py-2">
              <button
                @click="showForm = !showForm"
                class="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
              >
                <i class="fas fa-plus mr-1"></i> Add
              </button>
            </td>
            <td class="px-4 py-2">
              <button
                @click="deleteBook(index)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                <i class="fas fa-trash mr-1"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4 space-x-2">
      <button
        v-for="page in 3"
        :key="page"
        class="border px-3 py-1 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

const showForm = ref(false);

const addBook = () => {
  const id = `${books.value.length + 1}-${Math.floor(Math.random() * 1000)}`;
  books.value.push({ ...newBook.value, id, available: true });
  newBook.value = { title: "", author: "", category: "" };
  showForm.value = false;
};

const deleteBook = (index: number) => {
  books.value.splice(index, 1);
};
</script>
