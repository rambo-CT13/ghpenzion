const initialState = {
  profile: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.item };

    default:
      return state;
  }
};
