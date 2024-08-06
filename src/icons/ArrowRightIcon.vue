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
      d="M9.277 6.277c.37-.37.97-.37 1.34 0l5.053 5.053c.37.37.37.97 0 1.34l-5.053 5.053a.947.947 0 11-1.34-1.34L13.66 12 9.277 7.617a.947.947 0 010-1.34z"
      fill="#000"
    />
  </svg>
</template>

<script setup lang="ts">
type ArrowRightIconPropsType = {
  size: number;
};

defineProps<ArrowRightIconPropsType>();
</script>
