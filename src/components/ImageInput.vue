<template>
  <label class="image-input">
    <span class="image-input__label">Загрузить файл</span>
    <input class="image-input__input visually-hidden" type="file" />
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImageInput',

  // setup() {},
});
</script>

<style lang="scss" scoped>
.image-input {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bgLightColor);
  border: 2px solid var(--color);
  border-radius: var(--outer-padding);
  cursor: pointer;

  &:hover,
  &:focus-within {
    .image-input__label {
      opacity: 0.75;
    }
    .image-input__label::before {
      transform: scale(1);
    }
  }
}
.image-input__label {
  position: relative;
  padding: 2px 0;
  font-size: 2rem;
  transition: opacity 0.2s;

  &::before {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color);
    transform: scale(0);
    transition: transform 0.2s;
  }
}
.image-input__input {
}
</style>
