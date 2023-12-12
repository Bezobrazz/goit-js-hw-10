import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import { createCatMarkup } from './cat-markup.js';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-card');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

export function showLoader() {
  loader.style.display = 'block';
  catInfoDiv.style.display = 'none';
  error.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showCatInfo() {
  catInfoDiv.style.display = 'block';
}

function showError() {
  error.style.display = 'block';
}

fetchBreeds()
  .then(data => {
    showCatInfo();
    return data.map(breed => ({
      id: breed.id,
      name: breed.name,
    }));
  })
  .catch(error => {
    showError();
    console.error(error);
    throw error;
  })
  .then(breeds => {
    const breedOptions = breeds.map(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      return option;
    });

    breedSelect.append(...breedOptions);
  })
  .catch(error => {
    console.error('Error fetching breeds:', error);
  })
  .finally(() => {
    hideLoader();
  });

breedSelect.addEventListener('change', onBreedSelectChange);

function onBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then(data => {
        showCatInfo();
        return data[0];
      })
      .then(catData => {
        catInfoDiv.innerHTML = createCatMarkup(catData);
      })
      .catch(error => {
        showError();
        console.error('Error fetching cat data:', error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  } else {
    catInfoDiv.innerHTML = '';
  }
}
