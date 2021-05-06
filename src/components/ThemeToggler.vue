<template>
  <button
    class="toggler"
    type="button"
    aria-label="переключатель темы"
    @click="toggleTheme"
  >
    <span
      class="toggler__thumb"
      :class="{
        'toggler__thumb--light': !isDark,
        'toggler__thumb--dark': isDark,
      }"
    >
      <svg
        width="18px"
        height="18px"
        viewBox="0 0 512 512"
        aria-hidden="true"
        role="img"
        focusable="false"
        v-show="!isDark"
      >
        <path
          fill="currentColor"
          d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"
        />
      </svg>
      <svg
        width="18px"
        height="18px"
        viewBox="0 0 512 512"
        aria-hidden="true"
        role="img"
        focusable="false"
        v-show="isDark"
      >
        <path
          fill="currentColor"
          d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 00283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
        />
      </svg>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useThemeToggler from '../composable/useThemeToggler';

export default defineComponent({
  name: 'ThemeToggler',

  setup() {
    const { isDark, toggleTheme } = useThemeToggler();

    return {
      isDark,
      toggleTheme,
    };
  },
});
</script>

<style lang="scss" scoped>
.toggler {
  position: relative;
  display: block;
  height: 24px;
  width: 48px;
  color: var(--color);
  border: 2px solid var(--color);
  border-radius: 12px;
  background-color: transparent;
  transition: color 0.3s, background-color 0.3s, box-shadow 0.3s;
  outline: none;

  &:hover {
    box-shadow: 0 0 6px var(--color);
  }

  &:focus-visible {
    box-shadow: 0 0 6px var(--color);
  }
}
.toggler__thumb {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin: 1px;
  transition: left 0.5s, transform 0.5s;
}
.toggler__thumb--light {
  left: 0;
}
.toggler__thumb--dark {
  left: 50%;
  transform: rotate(240deg);
}
</style>
