import axios from "axios";

//INITIAL STATE

const initState = {
  cocktails: [],
  ingredient: "",
  loading: false,
  error: false,
};

//ACTION CREATORS

const cocktailFetch = (str) => ({
  type: "FETCH",
  payload: str,
});

const cocktailFetchFail = () => ({
  type: "FETCH_FAIL",
});

const cocktailFetchSuccess = (cocktails) => ({
  type: "FETCH_SUCCESS",
  payload: cocktails,
});

//GET COCKTAILS

export const getCocktails = (str) => async (dispatch, getState) => {
  dispatch(cocktailFetch(str));
  try {
    const response = await axios(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${
        getState().cocktailState.ingredient
      }`
    );
    dispatch(cocktailFetchSuccess(response.data.drinks));
  } catch (error) {
    dispatch(cocktailFetchFail());
  }
};

//REDUCER

const cocktailReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "FETCH":
      return { ...state, ingredient: payload, loading: true, error: false };
    case "FETCH_SUCCESS":
      return { ...state, cocktails: payload, loading: false, error: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default cocktailReducer;
