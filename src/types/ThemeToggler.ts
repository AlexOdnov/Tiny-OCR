import { Ref } from 'vue';
import ToggleTheme from './../types/ToggleTheme';

export default interface ThemeToggler {
  isDark: Ref<boolean>;
  toggleTheme: ToggleTheme;
}
