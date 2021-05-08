<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <ocr-header />
    <div></div>
    <ocr-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useThemeToggler from './composable/useThemeToggler';
import OcrHeader from './components/OcrHeader.vue';
import OcrFooter from './components/OcrFooter.vue';

export default defineComponent({
  name: 'App',

  components: {
    OcrHeader,
    OcrFooter,
  },

  setup() {
    const { isDark, toggleTheme } = useThemeToggler();

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleTheme();
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', toggleTheme);

    return {
      isDark,
    };
  },
});
</script>

<style lang="scss">
:root {
  font-size: 14px;
  --outer-padding: 2rem;

  @media (min-width: 480px) {
    font-size: 16px;
  }
}
#app {
  font-family: 'Ubuntu', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.light {
  --bgDarkColor: #f5f5f5;
  --bgLightColor: #fff;
  --color: #2b2a33;
}
.dark {
  --bgDarkColor: #1c1b22;
  --bgLightColor: #2b2a33;
  --color: #f5f5f5;
}
.app {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  min-height: 100vh;
  color: var(--color);
  background-color: var(--bgDarkColor);
  transition: background-color 0.3s;
}
</style>
