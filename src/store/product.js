import { defineStore } from "pinia";

// import products from "@/data/products.json";

export const useProduct = defineStore("product", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default
    },
  },
});
