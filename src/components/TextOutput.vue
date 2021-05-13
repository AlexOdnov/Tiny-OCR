<template>
  <div class="text-output">
    <transition name="fade" mode="out-in">
      <p class="text-output__recognized-text" v-if="recognizedText">
        {{ recognizedText }}
      </p>
      <loading-indicator
        v-else-if="!recognizedText && recognizing.status"
        :recognizing="recognizing"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Recognizing from '../types/Recognizing';
import LoadingIndicator from './LoadingIndicator.vue';

export default defineComponent({
  name: 'TextOutput',

  components: { LoadingIndicator },

  props: {
    recognizedText: {
      type: String,
      required: true,
    },
    recognizing: {
      type: Object as PropType<Recognizing>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.text-output {
  padding: var(--outer-padding);
  background: var(--bgLightColor);
  border: 2px solid var(--color);
  border-radius: var(--outer-padding);
}
.text-output__recognized-text {
  height: 100%;
  text-align: left;
  white-space: pre-wrap;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
  }
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s 0.2s;
}
</style>
