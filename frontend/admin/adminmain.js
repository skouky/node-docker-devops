let userTableRef = document
  .querySelector("#userTable")
  .getElementsByTagName("tbody")[0];

fetch("/api/v1/users")
  .then((res) => res.json())
  .then((res) => {
    //console.log(res.data.users);
    for (const user of res.data.users) {
      var newRow = userTableRef.insertRow();

      var newCell = newRow.insertCell();
      var newText = document.createTextNode(user.username);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(user.fullName);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(user.role);
      newCell.appendChild(newText);

      var editButton = document.createElement("button");
      editButton.id = user._id;
      editButton.className = "editUser";
      editButton.innerText = "Edit";
      newCell = newRow.insertCell();
      newCell.appendChild(editButton);
    }
  })
  .then((res) => {
    let editUserButtons = document.querySelectorAll(".editUser");
    [...editUserButtons].forEach(function (item) {
      item.addEventListener("click", function (event) {
        console.log(event.target.id);
        window.location.replace(`/fe/v1/login/signup?id=${event.target.id}`);
      });
    });
  })
  .catch((error) => console.log(error));
