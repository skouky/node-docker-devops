let tradesTableRef = document
  .querySelector("#tradesTable")
  .getElementsByTagName("tbody")[0];

fetch("/api/v1/trades/user")
  .then((res) => res.json())
  .then((res) => {
    var newRow;
    var newCell;
    var newText;
    var editButton;
    for (const trade of res.data.trades.reverse()) {
      newRow = tradesTableRef.insertRow();
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.userId);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.date.split("T")[0]);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.brokerage);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.orderId);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.actionType);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.assetSymbol);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.units.$numberDecimal);
      newCell.appendChild(newText);
      newCell = newRow.insertCell();
      newText = document.createTextNode(trade.price.$numberDecimal);
      newCell.appendChild(newText);
      editButton = document.createElement("button");
      editButton.id = trade._id;
      editButton.className = "editTrade";
      editButton.innerText = "Edit";
      newCell = newRow.insertCell();
      newCell.appendChild(editButton);
    }
  })
  .then((res) => {
    let editTradeButtons = document.querySelectorAll(".editTrade");
    [...editTradeButtons].forEach(function (item) {
      item.addEventListener("click", function (event) {
        console.log(event.target.id);
        window.location.replace(`/fe/v1/trade/addedit?id=${event.target.id}`);
      });
    });
  })
  .catch((error) => console.log(error));
