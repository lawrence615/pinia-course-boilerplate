import { defineStore } from "pinia";
import { groupBy } from "lodash";

import { useAuth } from "@/store/auth";

export const useCart = defineStore("cart", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {

      // temporarily set results into a variable
      const grouped = groupBy(state.items, (item) => item.name)

      // take each of the object keys and sort them alphabetically
      const sorted = Object.keys(grouped).sort()

      // initialize new variable that will hold newly sorted results
      let inOrder = {}

      // loop through sorted puttin them in inOrder variable one at a time
      sorted.forEach(key => inOrder[key] = grouped[key])

      return inOrder
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    // total: (state) => {
    //   let total = 0;

    //   for (let i = 0; i < state.items.length; i++) {
    //     total += state.items[i].price;
    //   }

    //   return total;
    // },
    total: (state) => state.items.reduce((p, c) => p + c.price, 0),
  },
  actions: {
    checkout(){
      const authStore = useAuth()

      alert(`${authStore.username} just bought ${this.count} items at a total $${this.total}`)
    },
    addItems(count, item) {
      count = parseInt(count);

      for (let index = 0; index < count; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(name) {
      this.items = this.items.filter((item) => item.name !== name);
    },
    updateCartItem(count, item) {
      console.log('updateCartItem:',count)
      count = parseInt(count);

      this.clearItem(item.name)

      this.addItems(count, item)
    },
  },
});
