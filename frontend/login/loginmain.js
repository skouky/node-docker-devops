let loginUsername = document.querySelector("#loginUsername");
let loginPassword = document.querySelector("#loginPassword");
let loginButton = document.querySelector("#loginButton");
let loginMessage = document.querySelector("#loginMessage");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  //console.log(loginUsername.value);
  //console.log(loginPassword.value);
  fetch("/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: loginUsername.value,
      password: loginPassword.value,
    }),
  }).then((res) => {
    //console.log(res);
    if (res.ok) {
      window.location.replace("/fe/v1");
      //console.log("asdf");
    } else {
      loginMessage.textContent = "Login Failure";
    }
  });
});
