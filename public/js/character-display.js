const displayCharacterHandler = async (event) => {
  event.preventDefault();
  const id = event.target.attributes['data-id'].nodeValue;
  try {
    const res = await fetch(`/api/characters/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.reload();
  } catch (err) {
    console.log(err);
  }
};

charArr = document.querySelectorAll('#char-pick');
charArr.forEach((char) => {
  char.addEventListener('click', displayCharacterHandler);
});
