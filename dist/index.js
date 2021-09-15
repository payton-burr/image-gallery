const auth = '563492ad6f9170000100000180543d2a83114fb3a74dc663d43f3d53';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
const main = document.querySelector('main');
let currentSearch;
let fetchLink;
let page = 1;
let searchValue;
// Event listeners
more.addEventListener('click', loadMore);
searchInput.addEventListener('input', (e) => {
    searchValue = e.target.value;
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhoto(searchValue);
});
async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth,
        },
    });
    return (await dataFetch.json());
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
    }
    else {
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
    }
    else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generate(data);
}
curatedPhotos();
