import { useStore } from "vuex";
import { useConfirm } from "primevue/useconfirm";

export function useDelete(category) {
  const store = useStore();
  const confirm = useConfirm();

  function confirmDeleteSelected(value) {
    confirm.require({
      acceptLabel: "Да",
      rejectLabel: "Нет",
      message: "Вы уверенны что хотите удалить выбранные позиции",
      header: "Подтвердите действие",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        store.dispatch("shop/requestRemoveCategory", value);
        category.value = null;
      }
    });
  }
  return {
    confirmDeleteSelected
  };
}
