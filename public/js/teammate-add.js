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

//   let apiUrl = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${name}&fields=gear%2Cguild%2Cmythic_plus_scores_by_season%3Acurrent`;

//     fetch(apiUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         let role = data.active_spec_role;
//         let avatar = data.thumbnail_url;
//         let char_class = data.class;
//         let spec = data.active_spec_name;
//         let ilvl = data.gear.item_level_equipped;
//         let current_m_score = data.mythic_plus_scores_by_season[0].scores.all;

//         console.log(role, avatar, char_class, spec, ilvl, current_m_score, character_id);

//         fetch(`/api/teammates`, {
//           method: 'POST',
//           body: JSON.stringify({
//             name,
//             role,
//             avatar,
//             char_class,
//             spec,
//             ilvl,
//             current_m_score,
//             region,
//             realm,
//             character_id,
//           }),
//           headers: { 'Content-Type': 'application/json' },
//         }).then(function () {
//           document.location.reload();
//         });
//       });
//   } else {
//     alert('Please enter all fields');
//   }
// };
