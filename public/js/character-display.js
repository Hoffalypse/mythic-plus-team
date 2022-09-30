const displayCharacterHandler = async (event) => {
  let charPick = true;
  const id = event.target.attributes['data-id'].nodeValue;
  const response = await fetch(`/api/characters/${id}`, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  });

  if (response.ok) {
    return response, charPick;
  } else {
    alert('No Dice');
  }
};

charArr = document.querySelectorAll('#char-pick');
charArr.forEach((button) => {
  button.addEventListener('click', displayCharacterHandler);
});
