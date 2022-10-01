const displayCharacterHandler = (event) => {
  event.preventDefault();
  const id = event.target.attributes['data-id'].nodeValue;
  fetch(`/api/characters/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(function () {
      document.location.reload();
    })
    .catch((err) => console.log(err));
};

charArr = document.querySelectorAll('#char-pick');
charArr.forEach((char) => {
  char.addEventListener('click', displayCharacterHandler);
});
