import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-card');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(catData => {
        catInfoDiv.innerHTML = `
				<h2 class="cat-card-title">${catData.breeds[0].name}</h2>
          <img class="cat-card-img" src="${catData.url}" alt="${catData.breeds[0].name}">
          <p class="cat-card-descr">Description: ${catData.breeds[0].description}</p>
          <p class="cat-card-temperament"><span class="cat-card-temp">Temperament:</span> ${catData.breeds[0].temperament}</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching cat data:', error);
      });
  } else {
    catInfoDiv.innerHTML = '';
  }
});
