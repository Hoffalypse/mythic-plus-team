const deleteTeammateHandler = async (event) => {
  const id = event.target.attributes['data-id'].nodeValue;

  const response = await fetch(`/api/teammates/${id}`, {
    method: 'DELETE',

    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete.');
  }
};

charArr = document.querySelectorAll('.tmate-del');
charArr.forEach((button) => {
  button.addEventListener('click', deleteTeammateHandler);
});
