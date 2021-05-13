<template>
  <div class="loading-indicator">
    <svg viewBox="0 0 42 42">
      <circle class="loading-indicator__circle" r="45%" cx="50%" cy="50%" />
      <circle
        class="loading-indicator__line"
        :stroke-dasharray="dasharray"
        r="45%"
        cx="50%"
        cy="50%"
        ref="line"
      />
    </svg>
    <span class="loading-indicator__status">{{ recognizing.status }}...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, PropType } from 'vue';
import Recognizing from '../types/Recognizing';

export default defineComponent({
  name: 'LoadingIndicator',

  props: {
    recognizing: {
      type: Object as PropType<Recognizing>,
      required: true,
    },
  },

  setup(props) {
    const line = ref<null | SVGCircleElement>(null);
    const circumference = ref(0);

    onMounted(() => {
      const radius = line.value?.r.baseVal.value || 0;
      circumference.value = 2 * Math.PI * radius;
    });

    const dasharray = computed(
      () =>
        `${props.recognizing.progress * circumference.value} ${
          circumference.value
        }`
    );

    return {
      line,
      dasharray,
    };
  },
});
</script>

<style lang="scss" scoped>
.loading-indicator {
  position: relative;
  width: 100%;
  height: 100%;
}
.loading-indicator__status {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  text-transform: capitalize;
}
.loading-indicator__circle,
.loading-indicator__line {
  fill: transparent;
  stroke: var(--color);
  stroke-width: 0.125rem;
  transform-origin: center;
  transform: rotate(-90deg);
  transition: stroke-dasharray 0.2s ease;
}
.loading-indicator__line {
  stroke: #008000;
}
</style>
