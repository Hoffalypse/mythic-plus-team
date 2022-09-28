const newReviewHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-input').value.trim();
    const region = document.querySelector('#region-input').value;
    const realm = document.querySelector('#realm-input').value;
  
    if (name && region && realm) {
      let apiUrl = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent`;

      fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.class)
  
        })
      }
      else{
          alert("Please enter all fields")
      }
  
     
    const response = await fetch(`/api/reviews`, {
    method: 'POST',
    body: JSON.stringify({ name, content }),
    headers: {'Content-Type': 'application/json'},
  });
      // if (response.ok) {
        
      //   document.location.replace('/dashboard');
      // } else {
      //   alert('screw this I quit');
      // }
  //   }
  // };
}
  document
  .querySelector('.new-character')
  .addEventListener('submit', newReviewHandler);