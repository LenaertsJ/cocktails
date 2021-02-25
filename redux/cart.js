//INITIAL STATE
const initState = {
  items: [],
};

//ACTION CREATORS

export const add = (cocktail) => ({
  type: "ADD",
  payload: cocktail,
});

export const remove = (id) => ({
  type: "REMOVE",
  payload: id,
});

//REDUCER

const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "ADD":
      return {
        ...state,
        items: [
          ...state.items,
          {
            name: payload.name,
            price: payload.price,
            quantity: payload.quantity,
          },
        ],
      };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id != payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
