const addNote = async (event) => {
  event.preventDefault();

  const id = event.target.attributes['data-id'].nodeValue;
  const note = document.querySelector(`[data-note="${id}"]`).value.trim();


  if (note) {
    fetch(`/api/teammates`, {
      method: 'PUT',
      body: JSON.stringify({
        id,
        note,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(function () {
      document.location.reload();
    });
  } else {
    alert('Please enter all fields');
  }
};

noteArr = document.querySelectorAll('.new-note');
console.log(noteArr);
noteArr.forEach((button) => {
  button.addEventListener('click', addNote);
});
