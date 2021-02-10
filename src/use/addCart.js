import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";

export function useAddCart(props) {
  const store = useStore();
  const cart = computed(() => store.getters["cart/cart"]);
  const product = reactive(props.data);

  const quantityInCart = computed(() =>
    cart.value[props.data.id] ? cart.value[props.data.id] : 0
  );
  const quantity = ref(quantityInCart.value);
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
    quantity,
    quantityInCart
  };
}
