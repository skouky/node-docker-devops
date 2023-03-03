//let loginUsername = document.querySelector("#loginUsername");
//let loginPassword = document.querySelector("#loginPassword");
//let loginButton = document.querySelector("#loginButton");
//let loginMessage = document.querySelector("#loginMessage");

let brokerage = document.querySelector("#brokerage");
let date = document.querySelector("#date");
let orderId = document.querySelector("#orderId");
let sellOrderId = document.querySelector("#sellOrderId");
let linkOrderId = document.querySelector("#linkOrderId");
let assetType = document.querySelector("#assetType");
let assetSymbol = document.querySelector("#assetSymbol");
let actionType = document.querySelector("#actionType");
let units = document.querySelector("#units");
let price = document.querySelector("#price");
let currency = document.querySelector("#currency");
let forExRate = document.querySelector("#forExRate");
let commission = document.querySelector("#commission");
let fees = document.querySelector("#fees");
let labels = document.querySelector("#labels");
let notes = document.querySelector("#notes");
let id = document.querySelector("#id");

tradeAddButton.addEventListener("click", function (event) {
  event.preventDefault();
  //console.log(loginUsername.value);
  //console.log(loginPassword.value);
  let theMethod;
  let theUrl;
  let bodyJson = JSON.stringify({
    brokerage: brokerage.value,
    date: date.value,
    orderId: orderId.value,
    sellOrderId: sellOrderId.value,
    linkOrderId: linkOrderId.value,
    assetType: assetType.value,
    assetSymbol: assetSymbol.value,
    actionType: actionType.value,
    units: units.value,
    price: price.value,
    currency: currency.value,
    forExRate: forExRate.value,
    commission: commission.value,
    fees: fees.value,
    labels: labels.value,
    notes: notes.value,
  });
  if (id.value) {
    theMethod = "PATCH";
    theUrl = `/api/v1/trades/${id.value}`;
  } else {
    theMethod = "POST";
    theUrl = "/api/v1/trades";
  }
  fetch(theUrl, {
    method: theMethod,
    headers: {
      "Content-type": "application/json",
    },
    body: bodyJson,
  }).then((res) => {
    if (res.ok) {
      window.location.replace("/fe/v1/trade");
    } else {
      loginMessage.textContent = "Login Failure";
    }
  });
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get("id")) {
  tradeDeleteDiv.style.display = "block";
  fetch(`/api/v1/trades/${urlParams.get("id")}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      brokerage.value = res.data.trade.brokerage;
      date.value = res.data.trade.date.split("T")[0];
      orderId.value = res.data.trade.orderId;
      sellOrderId.value = res.data.trade.sellOrderId;
      linkOrderId.value = res.data.trade.linkOrderId;
      assetType.value = res.data.trade.assetType;
      assetSymbol.value = res.data.trade.assetSymbol;
      actionType.value = res.data.trade.actionType;
      units.value = res.data.trade.units.$numberDecimal;
      price.value = res.data.trade.price.$numberDecimal;
      currency.value = res.data.trade.currency;
      forExRate.value = res.data.trade.forExRate;
      commission.value = res.data.trade.commission.$numberDecimal;
      fees.value = res.data.trade.fees.$numberDecimal;
      labels.value = res.data.trade.labels;
      notes.value = res.data.trade.notes;
      id.value = res.data.trade._id;
    });
} else {
  tradeDeleteDiv.style.display = "none";
}

tradeDeleteButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetch(`/api/v1/trades/${id.value}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      window.location.replace("/fe/v1/trade");
    } else {
      loginMessage.textContent = "Login Failure";
    }
  });
});
