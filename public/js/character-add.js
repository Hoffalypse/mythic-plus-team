const newCharacterHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-input').value.trim();
  const region = document.querySelector('#region-input').value;
  const realm = document.querySelector('#realm-input').value;

  if (name && region && realm) {
    try {
      await fetch(`/api/characters`, {
        method: 'POST',
        body: JSON.stringify({
          name,
          region,
          realm,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      document.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
};

document
  .querySelector('.new-character')
  .addEventListener('submit', newCharacterHandler);
