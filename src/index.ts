const auth: string = '563492ad6f9170000100000180543d2a83114fb3a74dc663d43f3d53';
const gallery: HTMLDivElement = document.querySelector('.gallery');
const searchInput: HTMLInputElement = document.querySelector('.search-input');
const form: HTMLFormElement = document.querySelector('.search-form');
const more: HTMLButtonElement = document.querySelector('.more');
const main: HTMLElement = document.querySelector('main');
let currentSearch: string;
let fetchLink: string;
let page: number = 1;
let searchValue: string;

// Event listeners

more.addEventListener('click', loadMore);

searchInput.addEventListener('input', (e: Event) => {
  searchValue = (e.target as HTMLInputElement).value;
});

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhoto(searchValue);
});

// Functions

type FetchObject = {
  next_page: string;
  page: number;
  per_page: number;
  photos: [];
  total_results: number;
};

async function fetchApi(url: string): Promise<FetchObject> {
  const dataFetch: Response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: auth,
    },
  });

  return (await dataFetch.json()) as Promise<FetchObject>;
}

function generate(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement('div');
    galleryImg.classList.add('gallery-img');
    galleryImg.innerHTML = `
    <div class="gallery-info">
      <p>${photo.photographer}</p> 
      <a href=${photo.src.original} target="_blank">Download</a>
    </div>
    <img src="${photo.src.large}"></img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = 'https://api.pexels.com/v1/curated?per_page&page=1';
  const data = await fetchApi(fetchLink);
  generate(data);
}

async function searchPhoto(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  console.log(data);
  if (data.total_results === 0) {
    const resultText = document.createElement('div');
    resultText.classList.add('result-text');
    resultText.innerText = 'Nothing found, try again :)';
    main.appendChild(resultText);
  } else {
    generate(data);
    main.children[1].remove();
  }
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page&page=${page}`;
  }

  const data = await fetchApi(fetchLink);
  generate(data);
}

curatedPhotos();
