const displayCharacterHandler = (event) => {
  event.preventDefault();
  const id = event.target.attributes['data-id'].nodeValue;
  fetch(`/api/characters/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .then((char) => {
      console.log(char);
    })
    .catch((err) => console.log(err));
};

charArr = document.querySelectorAll('#char-pick');
charArr.forEach((char) => {
  char.addEventListener('click', displayCharacterHandler);
});
