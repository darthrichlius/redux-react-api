interface LoggerMiddleWareOptions {
  target: string;
}
const logger =
  (options: LoggerMiddleWareOptions) => (store) => (next) => (action) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { getState, dispatch } = store;
    console.log("Parameters", options);
    console.log("store", store);
    console.log("next", next);
    console.log("action", action);

    next(action);
  };

export default logger;
