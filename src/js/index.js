import Item from "./Item";
import store from "../../redux/store";
import { inc, dec } from "../../redux/counter";
import { add, remove } from "../../redux/cart";
import { getCocktails } from "../../redux/cocktails";

/**
 * E-SHOP
 */

//SEARCH FOR COCKTAILS WITH GIVEN INGREDIENT

document.querySelector(".search").onsubmit = (e) => {
  e.preventDefault();
  store.dispatch(getCocktails(document.querySelector(".search input").value));
  document.querySelector(".search input").value = "";
};

//CREATE MENU WITH COCKTAILS

function renderMenu() {
  const { loading, cocktails } = store.getState().cocktailState;
  if (loading) {
    document.querySelector(".loading").style.display = "block";
  } else {
    document.querySelector(".loading").style.display = "none";
  }

  if (cocktails) {
    const shopHolder = document.querySelector(".menu");
    const quantity = store.getState().countState.counter;
    cocktails.forEach((cocktail) => {
      const price = Math.floor(Math.random() * (12 - 5 + 1) + 5);
      new Item(cocktail.strDrink, price, quantity, shopHolder);
    });
  }
}

renderMenu();
store.subscribe(renderMenu);

/**
 * CART
 */

function renderCart() {
  document.querySelector(".cart-list").innerHTML = store
    .getState()
    .cartState.items.map(
      (itemObj) => `<li class="cart-item">
      <h3>${itemObj.name}</h3>
      <div class="details">
      <p>price : ${itemObj.price}</p>
      <p class="quantity-field">quantity: ${itemObj.quantity}</p>
      </div>`
    )
    .join("");
}

renderCart();
store.subscribe(renderCart);

//ADD COCKTAIL TO CARTSTATE WHEN ADD BUTTON IS CLICKED

window.addEventListener("added", (e) => {
  const cocktail = {
    name: e.detail.getName(),
    price: e.detail.getPrice(),
    quantity: e.detail.getQuantity(),
  };
  store.dispatch(add(cocktail));
});

//CHANGE QUANTITY OF ITEM YOU WANT TO ORDER
function renderCount(id) {
  const { counter } = store.getState().countState;
  console.log(id);
  document.getElementById(id).innerText = counter;
}

//UPDATE COUNTSTATE WHEN BUTTON PRESSED

window.addEventListener("incCount", (e) => {
  store.dispatch(inc());
  e.detail.setQuantity(store.getState().countState.counter);

  const id = e.detail.getID();
  console.log(id);
  renderCount(`${id}`);
});

window.addEventListener("decCount", (e) => {
  store.dispatch(dec());
  e.detail.setQuantity(store.getState().countState.counter);

  const id = e.detail.getID();
  renderCount(`${id}`);
});
