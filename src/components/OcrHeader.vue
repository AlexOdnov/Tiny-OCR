<template>
  <header class="header">
    <h1 class="header__title">Tiny-OCR</h1>
    <p class="header__description">
      Приложение для оптического распознавания текста (OCR) основанное на
      библиотеке Tesseract.js
    </p>
  </header>
</template>

<script lang="ts">
export default {
  name: 'OcrHeader',
};
</script>

<style lang="scss" scoped>
.header {
  padding: 24px;
}
.header__title {
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 12px;
}
.header__description {
  font-size: 18px;

  @media (min-width: 640px) {
    font-size: 22px;
  }
}
</style>
