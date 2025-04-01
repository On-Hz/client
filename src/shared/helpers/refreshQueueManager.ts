let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

export const setRefreshing = (val: boolean) => { isRefreshing = val; };
export const getRefreshing = () => isRefreshing;

export const addToQueue = (cb: (token: string) => void) => {
  queue.push(cb);
};

export const processQueue = (token: string) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};
