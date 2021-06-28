<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <ocr-header />
    <ocr-app />
    <ocr-footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useThemeToggler from './composable/useThemeToggler';
import OcrHeader from './components/OcrHeader.vue';
import OcrFooter from './components/OcrFooter.vue';
import OcrApp from './components/OcrApp.vue';

export default defineComponent({
  name: 'App',

  components: {
    OcrHeader,
    OcrFooter,
    OcrApp,
  },

  setup() {
    const { isDark, toggleTheme } = useThemeToggler();

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      toggleTheme();
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', toggleTheme);

    window.addEventListener('offline', () => {
      location.reload();
    });

    const preloadResource = (href: string, as: string) => {
      const resource = document.createElement('link');
      resource.href = href;
      resource.as = as;
      resource.rel = 'preload';
      document.head.appendChild(resource);
    };

    onMounted(() => {
      preloadResource('./tesseract/worker.min.js', 'script');
      preloadResource('./tesseract/tesseract-core.wasm.js', 'script');
      preloadResource('./tesseract/lang/rus.traineddata.gz', 'fetch');
      preloadResource('./tesseract/lang/eng.traineddata.gz', 'fetch');
    });

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
