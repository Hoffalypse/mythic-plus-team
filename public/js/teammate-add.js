const newCharacterHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-input').value.trim();
  const region = document.querySelector('#region-input').value;
  const realm = document.querySelector('#realm-input').value;
  const character_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (name && region && realm) {
    const response = await fetch(`/api/teammates`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        region,
        realm,
        character_id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert('No Dice');
    }
  }
};

document
  .querySelector('.new-teammate')
  .addEventListener('submit', newCharacterHandler);
