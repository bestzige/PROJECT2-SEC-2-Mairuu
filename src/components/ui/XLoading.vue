<script setup></script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
    <svg
      class="animate-spin h-12 w-12 text-blue-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4.472v3.09a5.001 5.001 0 00-5 5.238l3-1.732z"
      ></path>
    </svg>
  </div>
</template>
