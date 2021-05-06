import { ref, Ref } from 'vue';

type ToggleTheme = () => void;

interface ThemeToggler {
  isDark: Ref<boolean>;
  toggleTheme: ToggleTheme;
}

const isDark = ref(false);

export default function useThemeToggler(): ThemeToggler {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
  };
  return { isDark, toggleTheme };
}
