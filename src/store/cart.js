import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
  state: () => {
    return {
      items: [],
    };
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);

      for (let index = 0; index < count; index++) {
        this.items.push(item);
      }
    },
  },
});
