<template>
  <main class="flex-1 p-6 bg-white dark:bg-gray-900 min-h-screen mt-16">
    <!-- Header -->
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Dashboard
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-4">Overdue book loans</p>

    <!-- Add Student Form -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Students List
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
      @submit.prevent="addStudent"
      class="mb-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Name</label
          >
          <input
            v-model="newStudent.name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Action</label
          >
          <input
            v-model="newStudent.action"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Number</label
          >
          <input
            v-model="newStudent.number"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div class="flex items-end">
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Add Student
          </button>
        </div>
      </div>
    </form>

    <!-- Students Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr class="bg-[#0a1c3e] text-white text-left">
            <th class="px-4 py-2">No</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Action</th>
            <th class="px-4 py-2">Number</th>
            <th class="px-4 py-2">Add</th>
            <th class="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in students"
            :key="student.id"
            :class="
              index % 2 === 0
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-100 dark:bg-gray-700'
            "
          >
            <td class="px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ student.name }}</td>
            <td class="px-4 py-2">{{ student.id }}</td>
            <td class="px-4 py-2">{{ student.action }}</td>
            <td class="px-4 py-2">{{ student.number }}</td>
            <td class="px-4 py-2">
              <button
                @click="showForm = !showForm"
                class="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors"
              >
                Add
              </button>
            </td>
            <td class="px-4 py-2">
              <button
                @click="deleteStudent(index)"
                class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Delete
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

interface Student {
  id: string;
  name: string;
  action: string;
  number: string;
}

const students = ref<Student[]>([
  { id: "22345-1", name: "Kevin", action: "Spider-man", number: "0963559607" },
  { id: "5151-7", name: "Zeru", action: "Bat-Man", number: "088 688 6775" },
  { id: "5566-2", name: "Chang", action: "Superman", number: "012 345 6789" },
  {
    id: "7788-9",
    name: "Than",
    action: "Play-Never-Lose",
    number: "098 765 4321",
  },
]);

const newStudent = ref<Omit<Student, "id">>({
  name: "",
  action: "",
  number: "",
});

const showForm = ref(false);

const addStudent = () => {
  const id = `${students.value.length + 1}-${Math.floor(Math.random() * 1000)}`;
  students.value.push({ ...newStudent.value, id });
  newStudent.value = { name: "", action: "", number: "" };
  showForm.value = false;
};

const deleteStudent = (index: number) => {
  students.value.splice(index, 1);
};
</script>
