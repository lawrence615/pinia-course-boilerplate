<script setup>

import TheHeader from "@/components/TheHeader.vue";
import AppButton from "@/components/AppButton.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProduct } from "./store/product";
import { useCart } from "./store/cart";

const productStore = useProduct();
const cartStore = useCart();

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

productStore.fill();

</script>

<template>
  <div class="container">
    <TheHeader />

    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
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
