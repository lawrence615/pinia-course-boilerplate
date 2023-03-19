<script setup>
import { ref, reactive } from "vue";

import TheHeader from "@/components/TheHeader.vue";
import AppButton from "@/components/AppButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProduct } from "./store/product";
import { useCart } from "./store/cart";

const productStore = useProduct();
const carttStore = useCart();

productStore.fill();

const history = reactive([]);

const doingHistory = ref(false);

history.push(JSON.stringify(carttStore.$state));

const undo = () => {
  if (history.length === 1) return;

  doingHistory.value = true;

  history.pop();

  carttStore.$state = JSON.parse(history.at(-1));

  doingHistory.value = false;
};

carttStore.$subscribe((mutations, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
  }
});

carttStore.$onAction(({ name, store, args, after, onError }) => {
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
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="carttStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
