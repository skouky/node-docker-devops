//fetch("/api/v1/posts")
//  .then((res) => res.json())
//  .then((res) => {
//    if (res.message === "unauthorized") {
//      console.log("boys, we have an authentication issue!");
//      //window.location.replace("/fe/v1/login");
//    }
//  })
//  .then((data) => console.log(data))
//  .catch((error) => console.log(error));

let authenticationState = document.querySelector("#authenticationState");
let loginLink = document.querySelector("#loginLink");
let logoutLink = document.querySelector("#logoutLink");
let adminLink = document.querySelector("#adminLink");
fetch("/api/v1/users/state")
  .then((res) => res.json())
  .then((res) => {
    if (res.state === "Logged In") {
      authenticationState.value = "Logged In";
      logoutLink.style.display = "block";
      loginLink.style.display = "none";
      authenticationState.style.color = "green";
      adminLink.style.display = "block";
    } else if (res.state === "Logged Out") {
      authenticationState.value = "Logged Out";
      logoutLink.style.display = "none";
      loginLink.style.display = "block";
      adminLink.style.display = "none";
      authenticationState.style.color = "red";
    } else {
      authenticationState.value = "Server Error";
    }
  })
  .catch((error) => console.log(error));

let logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetch("/api/v1/users/logout", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      whatever: "whatever",
    }),
  }).then((res) => {
    if (res.ok) {
      window.location.replace("/fe/v1");
    } else {
      console.log(res);
    }
  });
});
