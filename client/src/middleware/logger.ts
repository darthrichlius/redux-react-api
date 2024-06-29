const logger = (param) => (store) => (next) => (action) => {
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getState, dispatch } = store;
  console.log("Parameters", param);
  console.log("store", store);
  console.log("next", next);
  console.log("action", action);

  next(action);
};

export default logger;
