<template>
  <header class="header">
    <h1 class="header__title">Tiny-OCR</h1>
    <p class="header__description">
      Приложение для оптического распознавания текста (OCR) основанное на
      библиотеке
      <a
        class="link header__link"
        href="https://github.com/naptha/tesseract.js"
        rel="noopener noreferrer"
        target="_blank"
        aria-label="Ссылка на Github"
      >
        Tesseract.js
      </a>
    </p>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OcrHeader',
});
</script>

<style lang="scss" scoped>
.header {
  padding: var(--outer-padding);
}
.header__title {
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 1rem;
}
.header__description {
  font-size: 1.5rem;
}
</style>
