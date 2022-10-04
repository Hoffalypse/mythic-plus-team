const newCharacterHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-input').value.trim();
  const region = document.querySelector('#region-input').value;
  const realm = document.querySelector('#realm-input').value;

  if (name && region && realm) {
<<<<<<< HEAD
    const response = await fetch(`/api/characters`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        region,
        realm,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
=======
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
>>>>>>> b8fc36a9763e7660fc4df8cb78efe6f93192b778
      document.location.reload();
    } catch (err) {
      console.log(err);
    }
  }
};

document
  .querySelector('.new-character')
  .addEventListener('submit', newCharacterHandler);
