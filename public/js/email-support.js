var submitEl = document.querySelector("#submit");
var nameInput = document.querySelector("#firstName");
var emailInput = document.querySelector("#email");
var submissionResponseEl = document.querySelector("#response");

function showResponse(event) {
  event.preventDefault();
  console.log(event);
  var response =
    "Thank you for your submission " +
    nameInput.value +
    "! We will reach out to you at " +
    emailInput.value +
    ".";
  submissionResponseEl.textContent = response;
}

submitEl.addEventListener("click", showResponse);
