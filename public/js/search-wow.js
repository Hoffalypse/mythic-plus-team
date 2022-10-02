const searchWow = (event) => {
  event.preventDefault();
  const searchInput = document.querySelector('#wow-search-input').value.trim();
  window.open(
    `https://worldofwarcraft.com/en-us/search?q=${searchInput}`,
    '_blank'
  );
};

document.querySelector('#wow-search').addEventListener('click', searchWow);
