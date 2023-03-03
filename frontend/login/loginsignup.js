let loginUsername = document.querySelector("#loginUsername");
let loginPassword = document.querySelector("#loginPassword");
let fullName = document.querySelector("#fullName");
let role = document.querySelector("#role");
let signupButton = document.querySelector("#signupButton");
let id = document.querySelector("#id");
let option;

signupButton.addEventListener("click", function (event) {
  event.preventDefault();
  let theBody = JSON.stringify({
    username: loginUsername.value,
    password: loginPassword.value,
    fullName: fullName.value,
    role: role.value,
  });
  if (id.value) {
    theMethod = "PATCH";
    theUrl = `/api/v1/users/signup/${id.value}`;
  } else {
    theMethod = "POST";
    theUrl = "/api/v1/users/signup";
  }
  fetch(theUrl, {
    method: theMethod,
    headers: {
      "Content-type": "application/json",
    },
    body: theBody,
  }).then((res) => {
    //console.log(res);
    if (res.ok) {
      window.location.replace("/fe/v1/admin");
      //console.log("asdf");
    } else {
      loginMessage.textContent = "Login Failure";
    }
  });
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get("id")) {
  userDeleteDiv.style.display = "block";
  fetch(`/api/v1/users/signup/${urlParams.get("id")}`)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      loginUsername.value = res.data.user.username;
      //loginPassword.value = res.data.user.password;
      fullName.value = res.data.user.fullName;
      //role.value = res.data.user.role;
      id.value = res.data.user._id;
      for (var i = 0; i < role.options.length; i++) {
        option = role.options[i];
        if (option.value === res.data.user.role) {
          option.setAttribute("selected", true);
          return;
        }
      }
    });
} else {
  userDeleteDiv.style.display = "none";
}

userDeleteButton.addEventListener("click", function (event) {
  event.preventDefault();
  fetch(`/api/v1/users/signup/${id.value}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      window.location.replace("/fe/v1/admin");
    } else {
      loginMessage.textContent = "Login Failure";
    }
  });
});
