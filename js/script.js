var link = document.querySelector(".feedback-btn");
var popup = document.querySelector(".modal-feedback");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector("form");
var login = popup.querySelector("[name=name-for-feedback]");
var email = popup.querySelector("[name=email-for-feedback]");
var textarea = popup.querySelector("[name=text]");
var isStorageSupport = true;
var storage = {
  login: "",
  email: ""
};
var overlay = document.querySelector(".overlay");

try {
  storage.login = localStorage.getItem("login");
  storage.email = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("overlay-show");

  if (storage.login) {
    login.value = storage.login;
    {
      if (storage.email) {
        email.value = storage.email;
        textarea.focus();
      } else {
        email.focus();
      }
    }
  } else {
    login.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("overlay-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value || !textarea.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
      localStorage.setItem("email", email.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      overlay.classList.remove("overlay-show");
      popup.classList.remove("modal-error");
    }
  }
})
