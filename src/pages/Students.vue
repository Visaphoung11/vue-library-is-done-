<template>
  <main class="flex-1 p-4 sm:p-8 bg-white min-h-screen mt-0">
    <!-- Header -->
    <h1
      class="text-2xl sm:text-3xl font-semibold text-gray-800 animate-fade-in"
    >
      {{ t("nav.dashboard") }}
    </h1>
    <p class="text-gray-500 mb-4 sm:mb-6">
      {{ t("dashboard.overview") }}
    </p>

    <!-- Add Student Button -->
    <div class="flex justify-between items-center mb-4">
      <h2
        class="text-lg sm:text-xl font-semibold text-gray-800 animate-fade-in"
      >
        {{ t("students.title") }}
      </h2>
      <button
        @click="openAddModal"
        class="px-4 sm:px-5 py-1 sm:py-2 border border-blue-500 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-300"
      >
        New
      </button>
    </div>

    <!-- Modal for Adding/Editing Student -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg animate-form-slide"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          {{ editingStudent ? "Edit Student" : "Add New Student" }}
        </h3>
        <form @submit.prevent="submitStudent">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Name</label
              >
              <input
                v-model="newStudent.full_name"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                @input="validateForm"
              />
              <p v-if="errors.full_name" class="text-red-500 text-xs mt-1">
                {{ errors.full_name }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >ID Card</label
              >
              <input
                v-model="newStudent.id_card"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                @input="validateForm"
              />
              <p v-if="errors.id_card" class="text-red-500 text-xs mt-1">
                {{ errors.id_card }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Class</label
              >
              <input
                v-model="newStudent.class"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800"
                @input="validateForm"
              />
              <p v-if="errors.student_class" class="text-red-500 text-xs mt-1">
                {{ errors.student_class }}
              </p>
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
              :disabled="!isFormValid"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
            >
              {{ editingStudent ? "Update Student" : "Add Student" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Students Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-xs sm:text-sm">
        <thead>
          <tr class="bg-slate-800 text-white text-left">
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.no") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.name") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.id") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              Class
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("books.fields.created_by") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.add") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.edit") }}
            </th>
            <th class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              {{ t("students.delete") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in students"
            :key="student.id"
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
              {{ student.full_name }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ student.id_card }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ student.class }}
            </td>
            <td
              class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200 text-gray-800"
            >
              {{ student.created_by }}
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="openAddModal"
                class="bg-orange-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-orange-500 transition-colors duration-300"
              >
                {{ t("students.add") }}
              </button>
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="openEditModal(index)"
                class="bg-blue-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
              >
                Edit
              </button>
            </td>
            <td class="px-2 sm:px-6 py-2 sm:py-3 border border-gray-200">
              <button
                @click.stop="deleteStudent(index)"
                class="bg-red-400 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
              >
                {{ t("students.delete") }}
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

interface Student {
  id: string;
  full_name: string;
  id_card: string;
  class: string;
  created_by: number;
}

const { t } = useLanguage();
const toast = useToast();
const router = useRouter();
const { token, isAuthenticated } = useAuth();

const API_URL = "http://localhost:3000/api/students";

const students = ref<Student[]>([]);
const newStudent = ref<Partial<Student>>({
  full_name: "",
  id_card: "",
  class: "",
});
const errors = ref<Partial<Record<keyof Student | "student_class", string>>>({
  full_name: "",
  id_card: "",
  student_class: "",
});
const showModal = ref(false);
const clickedRow = ref<number | null>(null);
const editingStudent = ref<Student | null>(null);
const isFormValid = ref(false);

// Fetch students from API
const fetchStudents = async () => {
  if (!isAuthenticated.value || !token.value) {
    toast.error("Please log in to access students");
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
    students.value = data.map((student: any) => ({
      id: student.id.toString(),
      full_name: student.full_name,
      id_card: student.id_card,
      class: student.class,
      created_by: student.created_by,
    }));
  } catch (error) {
    console.error("Error fetching students:", error);
    toast.error("Failed to fetch students");
  }
};

// Validate form inputs
const validateForm = () => {
  errors.value = {
    full_name: newStudent.value.full_name ? "" : "Name is required",
    id_card: newStudent.value.id_card
      ? students.value.some(
          (s) =>
            s.id_card === newStudent.value.id_card &&
            s.id !== (editingStudent.value?.id || "")
        )
        ? "ID Card must be unique"
        : ""
      : "ID Card is required",
    class: newStudent.value.class ? "" : "Class is required",
  };

  isFormValid.value = Object.values(errors.value).every((error) => !error);
};

export interface StudentForm {
  full_name: string;
  id_card: string;
  student_class: string;
}
// Open modal for adding a new student
const openAddModal = () => {
  editingStudent.value = null;
  newStudent.value = {
    full_name: "",
    id_card: "",
    class: "",
  };
  errors.value = {
    full_name: "",
    id_card: "",
    student_class: "",
  };
  isFormValid.value = false;
  showModal.value = true;
};

// Open modal for editing a student
const openEditModal = (index: number) => {
  editingStudent.value = { ...students.value[index] };
  newStudent.value = {
    full_name: editingStudent.value.full_name,
    id_card: editingStudent.value.id_card,
    class: editingStudent.value.class,
  };
  validateForm();
  showModal.value = true;
};

// Submit student (create only, as API doesn't support update)
const submitStudent = async () => {
  if (!isFormValid.value) return;

  if (!isAuthenticated.value || !token.value) {
    toast.error("Please log in to add a student");
    router.push("/login");
    return;
  }

  try {
    const payload = {
      full_name: newStudent.value.full_name,
      id_card: newStudent.value.id_card,
      student_class: newStudent.value.class,
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
    toast.success((result.message || "Student created") + " successfully!");

    await fetchStudents();

    newStudent.value = {
      full_name: "",
      id_card: "",
      class: "",
    };
    showModal.value = false;
    editingStudent.value = null;
  } catch (error) {
    console.error("Error creating student:", error);
    toast.error("Failed to create student");
  }
};

// Delete student (not implemented in API, keeping local deletion as fallback)
const deleteStudent = (index: number) => {
  students.value.splice(index, 1);
  toast.success("Student deleted successfully!");
};

// Handle row click for visual feedback
const handleRowClick = (index: number) => {
  clickedRow.value = index;
  setTimeout(() => {
    clickedRow.value = null;
  }, 300);
};

onMounted(fetchStudents);
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
