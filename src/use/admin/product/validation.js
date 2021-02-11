import { computed } from 'vue'

export function useValid(fild) {
   const MODEL_REQUIRED_FORM = {
        count: null,
      title: null,
      category: null,
      price: null,
    };
    const checkRequiredForm = computed(() =>
    Object.keys(MODEL_REQUIRED_FORM).reduce((acc, itm) => {
      return Boolean(fild[itm]) && acc;
    }, true)
  );
    return {
      checkRequiredForm
    }
}