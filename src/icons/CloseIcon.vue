<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.47 7.47a.75.75 0 011.06 0l8 8a.75.75 0 11-1.06 1.06l-8-8a.75.75 0 010-1.06z"
      fill="#000"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.53 7.47a.75.75 0 010 1.06l-8 8a.75.75 0 01-1.06-1.06l8-8a.75.75 0 011.06 0z"
      fill="#000"
    />
  </svg>
</template>

<script setup lang="ts">
type CloseIconPropsType = {
  size: number;
};

defineProps<CloseIconPropsType>();
</script>
