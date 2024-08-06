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
      d="M14.67 6.277c.37.37.37.97 0 1.34L10.287 12l4.383 4.383a.947.947 0 11-1.34 1.34L8.277 12.67a.947.947 0 010-1.34l5.053-5.053c.37-.37.97-.37 1.34 0z"
      fill="#000"
    />
  </svg>
</template>

<script setup lang="ts">
type ArrowLeftIconPropsType = {
  size: number;
};

defineProps<ArrowLeftIconPropsType>();
</script>
