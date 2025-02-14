import { create } from "zustand";

import {
  combine,
  subscribeWithSelector,
  persist,
  devtools,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState = {
  count: 1,
  double: 2,
};

export const useCountStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(initialState, (set) => ({
            increase: () =>
              set((state) => {
                state.count += 1;
              }),
            decrease: () =>
              set((state) => {
                state.count -= 1;
              }),
          }))
        )
      ),
      { name: "countStore" }
    )
  )
);
