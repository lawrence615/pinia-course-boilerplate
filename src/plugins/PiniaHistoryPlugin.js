import { reactive, ref } from "vue";

export function PiniaHistoryPlugin({ pinia, app, store, options }) {
  const history = reactive([]);

  const future = reactive([]);

  const doingHistory = ref(false);

  history.push(JSON.stringify(store.$state));

  store.$subscribe((mutations, state) => {
    if (!doingHistory.value) {
      history.push(JSON.stringify(state));

      future.splice(0, future.length);
    }
  });

  return {
    undo: () => {
      if (history.length === 1) return;

      doingHistory.value = true;

      future.push(history.pop());

      store.$state = JSON.parse(history.at(-1));

      doingHistory.value = false;
    },
    redo: () => {
      // pop the last element from the future array as it's the last element to be undone
      const latestState = future.pop();

      // if the no latest state. we return as there is nothing to redo
      if (!latestState) return;

      // set doingHistory to true
      doingHistory.value = true;

      // push the latest state back on to the history for it to available for undo again
      history.push(latestState);

      // replace store.$state with the latestState
      store.$state = JSON.parse(latestState);

      // set doingHistory to false
      doingHistory.value = false;
    },
  };
}
