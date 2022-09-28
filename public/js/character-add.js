const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title-input').value.trim();
    const content = document.querySelector('#content-input').value.trim();
    console.log(title + " " + content);
  
    if (title && content) {
      console.log(content);
      const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: {'Content-Type': 'application/json'},
      });
     
      if (response.ok) {
        console.log("here")
        document.location.replace('/dashboard');
      } else {
        alert('screw this I quit');
      }
    }
  };
  document
  .querySelector('.new-review-form')
  .addEventListener('submit', newReviewHandler);