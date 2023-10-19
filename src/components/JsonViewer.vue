<script setup>
  import { useJson } from '@/modules/json';

  const { json } = useJson();
</script>

<template>
  <div class="w-100% min-h-50px font-mono box-border p-12px b-1px b-style-solid b-#d3eeff b-rd-4px bg-#f5fcff">
    <pre>{{ json }}</pre>
  </div>
</template>