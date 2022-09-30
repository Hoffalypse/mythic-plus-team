const addNote = async (event) => {
    event.preventDefault();
   
    const id = event.target.attributes['data-id'].nodeValue;
    const note = document.querySelector('#note').value.trim();
    
  console.log(id, note);
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
  
  document
    .querySelector('.new-note')
    .addEventListener('submit', addNote);