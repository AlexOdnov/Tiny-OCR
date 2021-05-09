<template>
  <label class="image-input">
    <img class="image-input__preview" :src="imageSrc" v-show="imageSrc" />
    <span
      class="image-input__wrapper"
      :class="{ 'image-input__wrapper--with-image': imageSrc }"
    >
      <span class="image-input__label">Загрузить файл</span>
    </span>
    <input
      class="image-input__input visually-hidden"
      type="file"
      accept="image/*"
      ref="imageInput"
      @change.prevent="loadImage"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ImageInput',

  emits: {
    uploadImage: (payload) => (typeof payload === 'string' ? true : false),
  },

  setup(_, context) {
    const imageInput = ref<null | HTMLInputElement>(null);
    const imageSrc = ref<null | string>(null);

    const loadImage = () => {
      if (imageInput.value?.files?.length) {
        const file = imageInput.value.files[0];

        if (!file.type.includes('image/')) {
          console.error('файл должен быть изображением');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            const image = e.target.result;
            imageSrc.value = image;
            context.emit('uploadImage', image);
            return;
          }
          console.error('не удалось загрузить изображение');
        };
        reader.readAsDataURL(file);
      }
    };

    return {
      loadImage,
      imageInput,
      imageSrc,
    };
  },
});
</script>

<style lang="scss" scoped>
.image-input {
  position: relative;
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
    .image-input__wrapper--with-image {
      opacity: 1;
    }
  }
}
.image-input__wrapper--with-image {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.2s;
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
.image-input__preview {
  height: 100%;
  width: 100%;
  object-fit: scale-down;
}
.image-input__input {
}
</style>
