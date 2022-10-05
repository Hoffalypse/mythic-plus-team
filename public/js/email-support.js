var form = document.getElementById('my-form');
function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById('clickStatus');
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        status.classList.add('success');
        status.innerHTML = 'Message Sent! Thanks (:';
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, 'errors')) {
            status.classList.add('error');
            status.innerHTML = data['errors']
              .map((error) => error['message'])
              .join(', ');
          } else {
            status.classList.add('error');
            status.innerHTML = 'Error: Please try again :/';
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
      status.classList.add('error');
      clickStatus.innerHTML = 'Error: Please try again :/';
    });
}
form.addEventListener('submit', handleSubmit);
