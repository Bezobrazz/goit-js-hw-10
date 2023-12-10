const loader = document.querySelector('.loader');
const catInfoDiv = document.querySelector('.cat-card');
const error = document.querySelector('.error');

function showLoader() {
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

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const api_key =
    'live_CyIt46k5XXDF4CTRz4nbFjJVgzCAvMjg8oVWL8KZaKNtdiYNz2FSbLVVVYPhK1dp';

  showLoader();

  return fetch(url, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      hideLoader();
      showCatInfo();
      return data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error(error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = 'https://api.thecatapi.com/v1/images/search';
  const api_key =
    'live_CyIt46k5XXDF4CTRz4nbFjJVgzCAvMjg8oVWL8KZaKNtdiYNz2FSbLVVVYPhK1dp';

  showLoader();

  const queryParams = new URLSearchParams({
    breed_ids: breedId,
  });

  return fetch(`${url}?${queryParams.toString()}`, {
    headers: {
      'x-api-key': api_key,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      hideLoader();
      showCatInfo();
      return data[0];
    })
    .catch(error => {
      hideLoader();
      showError();
      console.error('Error fetching cat data:', error);
      throw error;
    });
}
