import { computed, ref } from "vue";
import { useStore } from "vuex";

export function useAddCart(props) {
  const store = useStore();
  const cart = computed(() => store.getters["cart/products"]);
  const checkCart = computed(() => cart.value.find(itm => itm.id === props.data.id))
  console.log(checkCart.value)
  const quantityInCart = computed(() => checkCart.value ? checkCart.value.quantity : 0);
  const quantity = ref(quantityInCart.value);
  function incQuantity() {
    store.commit("cart/SET_CART", {
      quantity: quantity.value,
      id: props.data.id
    });
    if (quantity.value === props.data.count)
      store.commit("shop/SET_COUNT", { id: props.data.id, count: 0 });
  }
  function addToCart() {
    quantity.value = 1
    store.commit("cart/ADD_TO_CART", {...props.data, quantity: 1})
  }
  return {
    addToCart,
    // description: props.data.description,
    incQuantity,
    quantity,
    quantityInCart
  };
}
