const displayCharacterHandler = async (event) => {
  event.preventDefault();
  const id = event.target.attributes['data-id'].nodeValue;
  const response = await fetch(`/api/characters/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  charData = response.json();
};

charArr = document.querySelectorAll('#char-pick');
charArr.forEach((char) => {
  char.addEventListener('click', displayCharacterHandler);
});
