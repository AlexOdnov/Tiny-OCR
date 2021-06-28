<template>
  <div
    class="ocr-select"
    :class="{ 'ocr-select--open': isOpenSelect }"
    ref="select"
    @keydown.esc="closeSelect"
    @keydown.up.down="switchOption"
  >
    <button
      class="button ocr-select__button"
      ref="selectTrigger"
      @click="toggleSelect"
    >
      {{ activeOptions }}
    </button>
    <ul
      class="ocr-select__options"
      :class="{
        'ocr-select__options--to-top': isToTop,
        'ocr-select__options--to-bottom': !isToTop,
      }"
      ref="selectOptions"
    >
      <li
        class="ocr-select__option"
        v-for="lang in options"
        :key="lang.code"
        :tabindex="isOpenSelect ? 0 : -1"
        @click="onSelectOption(lang.name, lang.code)"
        @keydown.space.enter="onSelectOption(lang.name, lang.code)"
      >
        {{ lang.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  PropType,
  onBeforeUnmount,
} from 'vue';
import LanguagesList from '../types/LanguagesList';

export default defineComponent({
  name: 'OcrSelect',

  props: {
    options: {
      type: Array as PropType<LanguagesList>,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Выбрать',
    },
  },

  emits: {
    selectOption: null,
  },

  setup(props, context) {
    const activeOptions = ref(props.placeholder);
    const select = ref<null | HTMLDivElement>(null);
    const selectOptions = ref<null | HTMLUListElement>(null);
    const optionsList = ref<null | Array<HTMLLIElement>>(null);
    const isOpenSelect = ref(false);
    const isToTop = ref(false);

    const openSelect = () => {
      const bottomSpace = +(
        document.documentElement.clientHeight -
        (select.value?.getBoundingClientRect().bottom || 0)
      ).toFixed();
      const optionsHeight = selectOptions.value?.clientHeight || 0;
      isToTop.value = bottomSpace < optionsHeight;
      isOpenSelect.value = true;
    };

    const closeSelect = () => {
      isOpenSelect.value = false;
    };

    const toggleSelect = () => {
      isOpenSelect.value ? closeSelect() : openSelect();
    };

    const onClickOutside = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!select.value?.contains(target)) {
        closeSelect();
      }
    };

    document.documentElement.addEventListener('click', onClickOutside);

    const onSelectOption = (langName: string, langCode: string) => {
      activeOptions.value = langName;
      closeSelect();
      context.emit('selectOption', langCode);
    };

    const switchOption = (e: KeyboardEvent) => {
      if (!isOpenSelect.value || !optionsList.value) {
        return;
      }
      const indexOfActiveOption = optionsList.value.indexOf(
        document.activeElement as HTMLLIElement
      );
      if (indexOfActiveOption === -1) {
        optionsList.value[0].focus();
        return;
      }
      if (e.code === 'ArrowUp') {
        indexOfActiveOption > 0
          ? optionsList.value[indexOfActiveOption - 1].focus()
          : optionsList.value[optionsList.value.length - 1].focus();
      }
      if (e.code === 'ArrowDown') {
        indexOfActiveOption < optionsList.value.length - 1
          ? optionsList.value[indexOfActiveOption + 1].focus()
          : optionsList.value[0].focus();
      }
    };

    onMounted(() => {
      optionsList.value = [...document.getElementsByTagName('li')];
    });

    onBeforeUnmount(() => {
      document.documentElement.removeEventListener('click', onClickOutside);
    });

    return {
      select,
      selectOptions,
      activeOptions,
      isOpenSelect,
      isToTop,
      openSelect,
      closeSelect,
      toggleSelect,
      switchOption,
      onSelectOption,
    };
  },
});
</script>

<style lang="scss" scoped>
.ocr-select {
  position: relative;
  overflow: hidden;
  width: 100%;

  &--open {
    overflow: visible;
  }
}
.ocr-select__button {
  position: relative;
  width: 100%;
  padding-right: 2rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0.65rem;
    display: block;
    width: 0;
    height: 0;
    border-left: 0.35rem solid transparent;
    border-right: 0.35rem solid transparent;
    border-top: 0.5rem solid currentColor;
    transform: translate(0, -50%);
  }
}
.ocr-select__options {
  position: absolute;
  z-index: 2;
  overflow: hidden;
  width: 100%;
  background: var(--bgLightColor);
  border: 1px solid var(--color);
  border-radius: 0.5rem;

  &--to-top {
    top: -2px;
    transform: translate(0, -100%);
  }
  &--to-bottom {
    bottom: -2px;
    transform: translate(0, 100%);
  }
}
.ocr-select__option {
  padding: 0.5rem;
  cursor: pointer;
  outline: none;

  &:not(:last-child) {
    border-bottom: 1px solid currentColor;
  }

  &:hover,
  &:focus {
    color: var(--bgLightColor);
    background: var(--color);
  }
}
</style>
