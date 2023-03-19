import { defineStore } from "pinia";
import { groupBy, sum } from "lodash";

export const useCart = defineStore("cart", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) => {
      let total = 0;

      for (let i = 0; i < state.items.length; i++) {
        total += state.items[i].price;
      }

      return total;
    },
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count);

      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
  },
});
