function Drink(name, ice, sugar) {
  this.name = name;
  this.ice = ice;
  this.sugar = sugar;
}

Drink.prototype.price = function () {
  switch (this.name) {
    case "Black Tea":
      return 30;
    case "Oolong Tea":
      return 30;
    case "Baozong Tea":
      return 30;
    case "Green Tea":
      return 30;
    case "Bubble Milk Tea":
      return 55;
    case "Lemon Green":
      return 50;
    case "Black Tea Latte":
      return 60;
    case "Mocha Latte":
      return 55;
    default:
      alert("No this drink");
  }
};

function AlphaPos() { }//空函數
const addButton = document.querySelector(".add-btn");
const orderLists = document.querySelector("[data-order-lists]");
const checkOutBtn = document.querySelector('[data-alpha-pos="checkout"]');
const alphaPos = new AlphaPos();

addButton.addEventListener("click", () => {
  const drinkName = alphaPos.getCheckedValue("drink");
  const ice = alphaPos.getCheckedValue("ice");
  const sugar = alphaPos.getCheckedValue("sugar");
  if (!drinkName) {
    alert("Please choose at least one item.");
    return;
  }
  const drink = new Drink(drinkName, ice, sugar);
  alphaPos.addDrink(drink);
});

orderLists.addEventListener("click", (e) => {
  if (e.target.matches('[data-alpha-pos="delete-drink"]')) {
    const target = e.target.parentElement.parentElement.parentElement;
    alphaPos.deleteOrder(target);
  }
});

checkOutBtn.addEventListener("click", () => {
  alert(`Total amount of drinks: ${alphaPos.checkOut()}`);

  alphaPos.clearOrder(orderLists);
});

AlphaPos.prototype.getCheckedValue = function (inputName) { //利用prototype來幫空函數增加內容
  const items = document.querySelectorAll(`[name=${inputName}]`);
  let selectedOption = "";
  items.forEach((item) => {
    if (item.checked) {
      selectedOption = item.value;
    }
  });
  return selectedOption;
};

AlphaPos.prototype.addDrink = function (drink) {
  const orderListsCard = `
<div class="card mb-3">
  <div class="card-body pt-3 pr-3">
    <div class="text-right">
      <span data-alpha-pos="delete-drink">×</span>
    </div>
    <h6 class="card-title mb-1">${drink.name}</h6>
    <div class="card-text">${drink.ice}</div>
    <div class="card-text">${drink.sugar}</div>
  </div>
  <div class="card-footer text-right py-2">
    <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
  </div>
</div>
`;
  orderLists.insertAdjacentHTML("afterbegin", orderListsCard);
};

AlphaPos.prototype.deleteOrder = function (target) {
  target.remove();
};

AlphaPos.prototype.checkOut = function () {
  const prices = document.querySelectorAll("[data-drink-price]");
  let sum = 0;
  prices.forEach((price) => {
    sum += Number(price.innerText);
  });
  return sum;
};

AlphaPos.prototype.clearOrder = function (target) {
  const orders = target.querySelectorAll(".card");
  orders.forEach((order) => order.remove());
};
