<template>
  <label class="flex flex-col gap-3 w-11/12 text-white text-lg lg:w-10/12">
    {{ title }}
    <input
      :type="type"
      class="w-full h-11 rounded-md bg-ternary px-3"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </label>
</template>
<script setup>
const props = defineProps([
  "type",
  "placeholder",
  "required",
  "modelValue",
  "title",
  "minlength",
  "maxlength",
]);
const emit = defineEmits(["update:modelValue"]);
</script>
