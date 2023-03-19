<script setup>
import { ref, reactive } from "vue";

import TheHeader from "@/components/TheHeader.vue";
import AppButton from "@/components/AppButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProduct } from "./store/product";
import { useCart } from "./store/cart";

const productStore = useProduct();
const cartStore = useCart();

productStore.fill();

const history = reactive([]);

const future = reactive([]);

const doingHistory = ref(false);

history.push(JSON.stringify(cartStore.$state));

const undo = () => {
  if (history.length === 1) return;

  doingHistory.value = true;

  future.push(history.pop());

  cartStore.$state = JSON.parse(history.at(-1));

  doingHistory.value = false;
};

const redo = () => {
  // pop the last element from the future array as it's the last element to be undone
  const latestState = future.pop();

  // if the no latest state. we return as there is nothing to redo
  if (!latestState) return;

  // set doingHistory to true
  doingHistory.value = true;

  // push the latest state back on to the history for it to available for undo again
  history.push(latestState);

  // replace cartStore.$state with the latestState
  cartStore.$state = JSON.parse(latestState);

  // set doingHistory to false
  doingHistory.value = false;
};

cartStore.$subscribe((mutations, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));

    future.splice(0,future.length)
  }
});

cartStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(args[0], args[1]);
    });

    onError((error) => {
      console.log("an error occurred:", error.message);
    });
  }
});
</script>

<template>
  <div class="container">
    <TheHeader />

    <div class="mb-5 flex justify-end">
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
