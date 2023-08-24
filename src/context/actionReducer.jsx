const actionReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOG_OUT":
      localStorage.removeItem("user");
      return { ...state, user: null };

    default:
      return state;
  }
};

export default actionReducer;
