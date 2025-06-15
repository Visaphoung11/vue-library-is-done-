<template>
  <main class="flex-1 p-4 sm:p-8 bg-white min-h-screen mt-0">
    <!-- Header -->
    <h1
      class="text-2xl sm:text-3xl font-semibold text-gray-800 animate-fade-in"
    >
      Borrowing Management
    </h1>
    <p class="text-gray-500 mb-4 sm:mb-6">Manage book loans</p>

    <!-- Add Loan Button -->
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-lg sm:text-xl font-semibold text-gray-800 animate-fade-in"
      >
        Borrowed Books List
      </h2>
      <button
        @click="showModal = true"
        class="px-4 sm:px-5 py-1 sm:py-2 border border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-300"
      >
        New
      </button>
    </div>

    <!-- Modal for Adding Loan -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg animate-form-slide"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Add New Loan</h3>
        <form @submit.prevent="handleBorrow">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Student ID</label
              >
              <input
                v-model="studentId"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Book ID</label
              >
              <input
                v-model="bookId"
                type="text"
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
              Borrow Book
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Borrowed Books Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs sm:text-sm">
        <thead>
          <tr class="bg-slate-800 text-white text-left">
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">No</th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Student
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Book
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Due Date
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Status
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Add
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Return
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(loan, index) in loans"
            :key="index"
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
              {{ loan.student }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ loan.book }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ loan.dueDate }}
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <span
                :class="{
                  'bg-green-100 text-green-800': loan.status === 'Borrowed',
                  'bg-gray-100 text-gray-800': loan.status === 'Returned',
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                {{ loan.status }}
              </span>
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
                v-if="loan.status === 'Borrowed'"
                @click.stop="returnBook(index)"
                class="bg-green-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
              >
                Return
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

interface Loan {
  student: string;
  book: string;
  dueDate: string;
  status: "Borrowed" | "Returned";
}

const studentId = ref("");
const bookId = ref("");
const showModal = ref(false);
const clickedRow = ref<number | null>(null);

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
  showModal.value = false;
};

const returnBook = (index: number) => {
  loans.value[index].status = "Returned";
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
