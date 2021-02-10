import { computed } from "vue";
/* eslint-disable */
export function useCountStatusStyle(count) {
  const countInStore = computed(() => count.value);
  const quantityText = computed(() =>
    countInStore.value < 1 ? "Товар закончился" :
    countInStore.value < 11 ? "Осталось мало" : "В наличии"
  );
  const quantityClass = computed(() => [
    "count-quantity",
    {
      "count-quantity-danger": countInStore.value < 1,
      "count-quantity-warning": countInStore.value < 11 && countInStore.value > 1,
      "count-quantity-success": countInStore.value > 10,
    },
  ]);
  return {
    quantityClass,
    quantityText,
  };
}
