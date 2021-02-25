import { v4 as uuid } from "uuid";

class Item {
  constructor(name, price, quantity, holder) {
    this._id = uuid();
    this._name = name;
    this._price = price + " euro";
    this._quantity = quantity;
    this._holder = holder;
    this._ref = this.init();
    this._added = new CustomEvent("added", { detail: this });
    this._incCount = new CustomEvent("incCount", { detail: this });
    this._decCount = new CustomEvent("decCount", { detail: this });
    this.setupEvents();
  }

  init() {
    this._holder.insertAdjacentHTML(
      "beforeend",
      `<li class="item">
            <h3>${this._name}</h3> 
            
              <div class="btns">
                <p>price: ${this._price}</p>
                <button class="btn btnRemove">-</button>
                <p id="${this._id}">${this._quantity}</p>
                <button class="btn btnAdd">+</button><br>
                <button class="order">grab it!</button>
              </div>
            </li>
`
    );

    return this._holder.querySelector(".item:last-child");
  }

  //GETTERS
  getName = () => {
    return this._name;
  };

  getPrice = () => {
    return this._price;
  };

  getQuantity = () => {
    return this._quantity;
  };

  getID = () => {
    return this._id;
  };

  //SETTERS
  setQuantity = (int) => {
    this._quantity = int;
  };

  //CREATE ADD EVENT
  setupEvents = () => {
    this._ref.querySelector(".order").onclick = this.addItem;
    this._ref.querySelector(".btnAdd").onclick = this.incCount;
    this._ref.querySelector(".btnRemove").onclick = this.decCount;
  };

  //ADD ITEM FUNCTION
  addItem = () => {
    // console.log("clicked");
    dispatchEvent(this._added);
  };

  //ONE UP COUNT FUNCTION
  incCount = () => {
    // console.log("clicked");
    dispatchEvent(this._incCount);
  };

  //ONE DOWN COUNT FUNCTION
  decCount = () => {
    dispatchEvent(this._decCount);
  };
}

export default Item;
