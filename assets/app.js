const auth = '563492ad6f9170000100000180543d2a83114fb3a74dc663d43f3d53';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
let searchValue;

// Event listeners

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  searchPhoto(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function curatedPhotos() {
  const dataFetch = await fetch('https://api.pexels.com/v1/curated?per_page&page=1', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <img src="${photo.src.large}"></img>
    <p>${photo.photographer}</p> `;
    gallery.appendChild(galleryImg);
  });
}

async function searchPhoto(query) {
  const dataFetch = await fetch(`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <img src="${photo.src.large}"></img>
    <p>${photo.photographer}</p> `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
