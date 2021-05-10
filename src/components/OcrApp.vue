<template>
  <div class="ocr-app">
    <image-input class="ocr-app__input" @uploadImage="onImageUpload" />
    <button class="button ocr-app__language" type="button">Выбрать язык</button>
    <text-output
      class="ocr-app__output"
      :recognizedText="recognizedText"
      :status="status"
      :progress="progress"
    />
    <div class="ocr-app__button-group">
      <button
        class="button"
        type="button"
        :disabled="!image"
        @click="startRecognize"
      >
        Распознать
      </button>
      <button
        class="button ocr-app__button-copy"
        type="button"
        aria-label="скопировать текст"
        title="скопировать текст"
        :disabled="!recognizedText"
        @click="copyText"
      >
        <svg
          width="32px"
          height="32px"
          aria-hidden="true"
          focusable="false"
          role="img"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { createWorker } from 'tesseract.js';
import ImageInput from './ImageInput.vue';
import TextOutput from './TextOutput.vue';

interface Recognizing {
  status: string;
  progress: number;
}

export default defineComponent({
  name: 'OcrApp',

  components: {
    ImageInput,
    TextOutput,
  },

  setup() {
    const image = ref<null | string>(null);
    const recognizedText = ref('');
    const recognizing = reactive<Recognizing>({
      status: '',
      progress: 0,
    });

    const onImageUpload = (e: string) => {
      image.value = e;
    };

    const startRecognize = async () => {
      recognizedText.value = '';
      recognizing.status = '';
      recognizing.progress = 0;

      const worker = createWorker({
        logger: (data: Recognizing) => {
          recognizing.status = data.status;
          if (data.status === 'recognizing text') {
            recognizing.progress = +data.progress.toFixed(3);
          }
        },
      });
      await worker.load();
      await worker.loadLanguage('rus');
      await worker.initialize('rus');
      const {
        data: { text },
      } = await worker.recognize(image.value);
      await worker.terminate();

      recognizedText.value = text;
    };

    const copyText = () => {
      navigator.clipboard.writeText(recognizedText.value);
    };

    return {
      image,
      ...toRefs(recognizing),
      recognizedText,
      onImageUpload,
      startRecognize,
      copyText,
    };
  },
});
</script>

<style lang="scss" scoped>
.ocr-app {
  --adaptive-width: calc(100vw - 2 * var(--outer-padding));
  --cell-width: clamp(264px, var(--adaptive-width), 480px);

  display: grid;
  place-content: center;
  grid-template-columns: var(--cell-width);
  grid-template-rows:
    var(--cell-width)
    min-content
    var(--cell-width)
    min-content;
  gap: var(--outer-padding);
  padding: 0 var(--outer-padding);

  @media (min-width: 640px) {
    --adaptive-width: min(50vh, calc(50vw - 1.5 * var(--outer-padding)));

    grid-template-columns:
      var(--cell-width)
      var(--cell-width);
    grid-template-rows: var(--cell-width) min-content;
  }
}
.ocr-app__input {
}
.ocr-app__output {
}
.ocr-app__language {
  place-self: center;
  @media (min-width: 640px) {
    grid-row: -1 / -2;
  }
}
.ocr-app__button-group {
  place-self: center;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.ocr-app__button-copy {
  padding: 0.5rem;
}
</style>
