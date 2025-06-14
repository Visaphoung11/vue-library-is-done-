<template>
  <main class="flex-1 p-6 bg-white dark:bg-gray-900 min-h-screen mt-16">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      {{ t("dashboard.title") }}
    </h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      {{ t("dashboard.overdue") }}
    </p>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="relative bg-gradient-to-br from-red-500 to-red-700 dark:from-red-600 dark:to-red-800 rounded-lg shadow-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
      >
        <div
          class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg"
        ></div>
        <i class="fas fa-dollar-sign text-2xl text-white"></i>
        <div class="relative text-white">
          <h3 class="text-md font-semibold">Budget</h3>
          <p class="text-xl font-bold">$24k</p>
          <p class="text-xs">
            <span class="text-green-300">↑ 12%</span> Since last month
          </p>
        </div>
      </div>

      <div
        class="relative bg-gradient-to-br from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 rounded-lg shadow-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
      >
        <div
          class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg"
        ></div>
        <i class="fas fa-users text-2xl text-white"></i>
        <div class="relative text-white">
          <h3 class="text-md font-semibold">Total Customers</h3>
          <p class="text-xl font-bold">1.6k</p>
          <p class="text-xs">
            <span class="text-red-300">↓ 16%</span> Since last month
          </p>
        </div>
      </div>

      <div
        class="relative bg-gradient-to-br from-yellow-500 to-yellow-700 dark:from-yellow-600 dark:to-yellow-800 rounded-lg shadow-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
      >
        <div
          class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg"
        ></div>
        <i class="fas fa-tasks text-2xl text-white"></i>
        <div class="relative text-white">
          <h3 class="text-md font-semibold">Task Progress</h3>
          <p class="text-xl font-bold">75.5%</p>
        </div>
      </div>

      <div
        class="relative bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-lg shadow-lg p-4 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300"
      >
        <div
          class="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-lg"
        ></div>
        <i class="fas fa-chart-line text-2xl text-white"></i>
        <div class="relative text-white">
          <h3 class="text-md font-semibold">Total Profit</h3>
          <p class="text-xl font-bold">$15k</p>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div>
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            Sales
          </h2>
          <button
            class="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <i class="fas fa-sync-alt"></i> Sync
          </button>
        </div>
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700"
        >
          <canvas ref="salesCanvas" class="w-full h-64"></canvas>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Traffic Source
        </h2>
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 flex items-center"
        >
          <canvas ref="trafficCanvas" class="w-full h-64"></canvas>
          <!-- <div class="ml-6 text-sm">
            <p><i class="fas fa-desktop"></i> Desktop: 63%</p>
            <p><i class="fas fa-tablet-alt"></i> Tablet: 15%</p>
            <p><i class="fas fa-mobile-alt"></i> Phone: 22%</p>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Recent Activity Feed -->
    <div>
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h2>
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border dark:border-gray-700 max-h-80 overflow-y-auto"
      >
        <div
          v-for="(activity, index) in activities"
          :key="index"
          class="flex items-start space-x-3 py-3 border-b dark:border-gray-700 last:border-b-0 animate-fade-in"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <i
            :class="activity.icon"
            class="text-xl text-blue-500 dark:text-blue-400"
          ></i>
          <div>
            <p class="text-sm text-gray-900 dark:text-white">
              {{ activity.message }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ activity.time }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useLanguage } from "../composables/useLanguage";
import Chart from "chart.js/auto";

const { t } = useLanguage();

// Chart canvases
const salesCanvas = ref<HTMLCanvasElement | null>(null);
const trafficCanvas = ref<HTMLCanvasElement | null>(null);
let salesChart: Chart | null = null;
let trafficChart: Chart | null = null;

// Chart data
const salesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Sales",
      data: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70],
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
    },
  ],
};

const trafficData = {
  labels: ["Desktop", "Tablet", "Phone"],
  datasets: [
    {
      data: [63, 15, 22],
      backgroundColor: [
        "rgba(253, 126, 20, 0.6)",
        "rgba(34, 197, 94, 0.6)",
        "rgba(147, 51, 234, 0.6)",
      ],
      borderWidth: 1,
    },
  ],
};

// Sample activity feed data
const activities = ref([
  { icon: "fas fa-book", message: "John borrowed '1984'", time: "2 hours ago" },
  {
    icon: "fas fa-undo",
    message: "Jane returned 'The Great Gatsby'",
    time: "4 hours ago",
  },
  {
    icon: "fas fa-user-plus",
    message: "New student Kevin registered",
    time: "1 day ago",
  },
  {
    icon: "fas fa-book",
    message: "Sarah borrowed 'To Kill a Mockingbird'",
    time: "2 days ago",
  },
]);

// Initialize charts
const initCharts = () => {
  if (salesCanvas.value && !salesChart) {
    console.log("Sales canvas found:", salesCanvas.value); // Debug
    salesChart = new Chart(salesCanvas.value, {
      type: "bar",
      data: salesData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Sales ($)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Month",
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            enabled: true,
          },
        },
        animation: {
          duration: 1000,
        },
      },
    });
    console.log("Sales chart initialized:", salesChart); // Debug
  }

  if (trafficCanvas.value && !trafficChart) {
    console.log("Traffic canvas found:", trafficCanvas.value); // Debug
    trafficChart = new Chart(trafficCanvas.value, {
      type: "doughnut",
      data: trafficData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Legend handled by text beside chart
          },
          tooltip: {
            enabled: true,
          },
        },
        animation: {
          duration: 1000,
        },
      },
    });
    console.log("Traffic chart initialized:", trafficChart); // Debug
  }
};

// Clean up charts on unmount
onUnmounted(() => {
  if (salesChart) {
    salesChart.destroy();
    salesChart = null;
    console.log("Sales chart destroyed"); // Debug
  }
  if (trafficChart) {
    trafficChart.destroy();
    trafficChart = null;
    console.log("Traffic chart destroyed"); // Debug
  }
});

onMounted(() => initCharts());
</script>

<style scoped>
/* Fade-in animation for activity feed */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
