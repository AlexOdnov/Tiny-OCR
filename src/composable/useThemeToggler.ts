import { ref } from 'vue';
import ThemeToggler from './../types/ThemeToggler';

const isDark = ref(false);

export default function useThemeToggler(): ThemeToggler {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };
  return { isDark, toggleTheme };
}
