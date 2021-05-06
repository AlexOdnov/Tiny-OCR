<template>
  <div class="app" :class="{ light: !isDark, dark: isDark }">
    <theme-toggler />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ThemeToggler from './components/ThemeToggler.vue';
import useThemeToggler from './composable/useThemeToggler';

export default defineComponent({
  name: 'App',

  components: { ThemeToggler },

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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.light {
  --bgDarkColor: #f7f7f8;
  --bgLightColor: #fff;
  --color: #0e0e10;
}
.dark {
  --bgDarkColor: #0e0e10;
  --bgLightColor: #18181b;
  --color: #efeff1;
}
.app {
  min-height: 100vh;
  color: var(--color);
  background-color: var(--bgDarkColor);
  transition: background-color 0.3s;
}
</style>
