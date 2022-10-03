const deleteCharacterHandler = async (event) => {
  const id = event.target.attributes['data-id'].nodeValue;

  const response = await fetch(`/api/characters/${id}`, {
    method: 'DELETE',

    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/character');
  } else {
    alert('Failed to delete.');
  }
};

charArr = document.querySelectorAll('.char-del');
charArr.forEach((button) => {
  button.addEventListener('click', deleteCharacterHandler);
});
