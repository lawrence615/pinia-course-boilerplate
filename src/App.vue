<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";

import { useProduct } from "./store/product";
import { useCart } from "./store/cart";

const productStore = useProduct();
const carttStore = useCart();

productStore.fill();
carttStore.$onAction(({ name, store, args, after, onError }) => {
  if (name === "addItems") {
    after(() => {
      console.log(args[0], args[1]);
    });

    onError((error)=>{
      console.log('an error occurred:', error.message);
    })
  }
});
</script>

<template>
  <div class="container">
    <TheHeader />
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
