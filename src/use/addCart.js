import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";

export function addCartView(props) {
  const store = useStore();
  const cart = computed(() => store.getters["cart/cart"]);
  const product = reactive(props.data);

  const quantityInCart = computed(() =>
    cart.value[props.data.id] ? cart.value[props.data.id] : 0
  );
  const quantity = ref(quantityInCart.value);
  const quantityText = computed(() =>
    props.data.count < 1
      ? "Товар закончился"
      : props.data.count < 11
      ? "Осталось мало"
      : "В наличии"
  );
  const quantityClass = computed(() =>
    props.data.count < 1
      ? "danger"
      : props.data.count < 11
      ? "warning"
      : "success"
  );
  function incQuantity() {
    store.commit("cart/SET_CART", {
      id: props.data.id,
      quantity: quantity.value
    });
    if (cart.value[props.data.id] === props.data.count)
      store.commit("shop/SET_COUNT", { id: props.data.id, count: 0 });
  }
  function addToCart() {
    quantity.value = 1;
  }
  return {
    addToCart,
    ...toRefs(product),
    // description: props.data.description,
    incQuantity,
    quantityText,
    quantityClass,
    quantity,
    quantityInCart
  };
}
