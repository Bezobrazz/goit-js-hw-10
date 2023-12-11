import { fetchBreeds } from './cat-api.js';
import { onBreedSelectChange } from './cat-markup.js';

const breedSelect = document.querySelector('.breed-select');

fetchBreeds()
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
  });

breedSelect.addEventListener('change', onBreedSelectChange);
