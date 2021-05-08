<template>
  <div class="text-output">
    <p>
      {{ recognizedText }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextOutput',

  props: {
    recognizedText: {
      type: String,
      required: true,
      default: '',
    },
  },

  // setup() {},
});
</script>

<style lang="scss" scoped>
.text-output {
  display: block;
  padding: var(--outer-padding);
  overflow: auto;
  text-align: left;
  background: var(--bgLightColor);
  border: 2px solid var(--color);
  border-radius: var(--outer-padding);
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
