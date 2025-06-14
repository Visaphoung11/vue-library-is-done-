<template>
  <main class="flex-1 p-6 bg-white dark:bg-gray-900 min-h-screen mt-16">
    <!-- Header -->
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Borrowing Management
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Manage book loans</p>

    <!-- Add Loan Form -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Borrowed Books List
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
      @submit.prevent="handleBorrow"
      class="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Student ID</label
          >
          <input
            v-model="studentId"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Book ID</label
          >
          <input
            v-model="bookId"
            type="text"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex items-end">
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Borrow Book
          </button>
        </div>
      </div>
    </form>

    <!-- Borrowed Books Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="bg-[#0a1c3e] text-white text-left">
            <th class="px-4 py-2">No</th>
            <th class="px-4 py-2">Student</th>
            <th class="px-4 py-2">Book</th>
            <th class="px-4 py-2">Due Date</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Add</th>
            <th class="px-4 py-2">Return</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(loan, index) in loans"
            :key="index"
            :class="
              index % 2 === 0
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-100 dark:bg-gray-700'
            "
          >
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ loan.student }}</td>
            <td class="px-4 py-2">{{ loan.book }}</td>
            <td class="px-4 py-2">{{ loan.dueDate }}</td>
            <td class="px-4 py-2">
              <span
                :class="{
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                    loan.status === 'Borrowed',
                  'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200':
                    loan.status === 'Returned',
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ loan.status }}
              </span>
            </td>
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
                v-if="loan.status === 'Borrowed'"
                @click="returnBook(index)"
                class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
              >
                <i class="fas fa-undo mr-1"></i> Return
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

interface Loan {
  student: string;
  book: string;
  dueDate: string;
  status: "Borrowed" | "Returned";
}

const studentId = ref("");
const bookId = ref("");
const showForm = ref(false);

const loans = ref<Loan[]>([
  {
    student: "S001",
    book: "Book A",
    dueDate: "2025-06-21",
    status: "Borrowed",
  },
  {
    student: "S002",
    book: "Book B",
    dueDate: "2025-06-25",
    status: "Borrowed",
  },
]);

const handleBorrow = () => {
  const newLoan = {
    student: studentId.value,
    book: bookId.value,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Borrowed" as const,
  };
  loans.value.push(newLoan);
  studentId.value = "";
  bookId.value = "";
  showForm.value = false;
};

const returnBook = (index: number) => {
  loans.value[index].status = "Returned";
};
</script>
