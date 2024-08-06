import { ref } from 'vue';
import type { Ref } from 'vue';

export default function useToggle(
  initialValue = false
): [Ref<boolean>, (value?: boolean) => void] {
  const active = ref(initialValue);

  const toggle = (value?: boolean): void => {
    active.value = value ? Boolean(value) : !active.value;
  };

  return [active, toggle];
}
