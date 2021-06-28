<template>
  <label
    class="image-input"
    :class="{ 'image-input--hovered': isHovered }"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    @drop.stop.prevent="dropImage"
  >
    <img class="image-input__preview" :src="imageSrc" v-show="imageSrc" />
    <span
      class="image-input__wrapper"
      :class="{ 'image-input__wrapper--with-image': imageSrc }"
    >
      <span class="image-input__label">Выберите или</span>
      <span class="image-input__label">перетащите файл</span>
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
    const isHovered = ref(false);

    const readImage = (file: File) => {
      if (!file.type.includes('image/')) {
        console.error('файл должен быть изображением');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          const b64Image = e.target.result;
          imageSrc.value = b64Image;
          context.emit('uploadImage', b64Image);
          return;
        }
        console.error('не удалось загрузить изображение');
      };
      reader.readAsDataURL(file);
    };

    const loadImage = () => {
      if (imageInput.value?.files?.length) {
        const file = imageInput.value.files[0];
        readImage(file);
      }
    };

    const onDragover = () => {
      isHovered.value = true;
    };

    const onDragleave = () => {
      isHovered.value = false;
    };

    const dropImage = (e: DragEvent) => {
      isHovered.value = false;
      if (e.dataTransfer?.files?.length) {
        const file = e.dataTransfer.files[0];
        readImage(file);
      }
    };

    return {
      loadImage,
      onDragover,
      onDragleave,
      dropImage,
      imageInput,
      imageSrc,
      isHovered,
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
  &:focus-within,
  &--hovered {
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
.image-input__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.image-input__wrapper--with-image {
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.2s;
}
.image-input__label {
  position: relative;
  padding: 2px 0;
  font-size: 1.5rem;
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
