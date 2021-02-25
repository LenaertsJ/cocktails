//INITIAL STATE

const initState = {
  counter: 1,
};

//ACTION CREATORS

export const inc = () => ({
  type: "INCREMENT",
});

export const dec = () => ({
  type: "DECREMENT",
});

//REDUCER

const countReducer = (state = initState, { type }) => {
  switch (type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default countReducer;
