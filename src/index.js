import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

import { fetchCountries } from './fetchCountries';

const refs = {
  input: document.querySelector(`input#search-box`),
  listCountry: document.querySelector(`.country-list`),
  infoCountry: document.querySelector(`.country-info`),
};

refs.input.addEventListener(`input`, debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(event) {
  event.preventDefault();
  console.log(refs.input.value);

  const nameCountry = refs.input.value.trim();

  //   const nameCountry = event.target.value.trim();

  fetchCountries(nameCountry)
    .then(renderContainerCountry)
    .then(renderListCountry)

    .catch(error => {
      Notiflix.Notify.failure('Error');
    });
  console.log(`выполняем HTTP запрос`);
}

// let countries = [];

function renderContainerCountry(nameCountry) {
  const { name, capital, population, flags, languages } = nameCountry[0];
  const country = nameCountry.map(
    ({ name, capital, population, flags, languages }) => ({
      name: name.official,
      capital: capital[0],
      population,
      flag: flags.svg,
      languages: Object.values(languages),
    })
  );

  const countryInfo = country[0];
  const template = `
    <h1 class="country-title">
      <img class="country-pic" src="${countryInfo.flag}" alt="Flag" width="40"
      >${countryInfo.name}
    </h1>
    <p class="country-descr"><span class="country-data">Capital: </span
    >${countryInfo.capital}</p>
    <p class="country-descr"><span class="country-data">Population: </span
    >${countryInfo.population.toLocaleString()}</p>
    <p class="country-descr"><span class="country-data">Languages: </span
    >${countryInfo.languages.join(', ')}</p>`;
  return (refs.infoCountry.innerHTML = template);
}

function clearCountryElems() {
  countryListElem.innerHTML = '';
  countryInfoElem.innerHTML = '';
}

function renderListCountry({ name, capital, population, flags, languages }) {
  const { names } = countries;
  // const country = nameCountry.map(
  //     ({ name, capital, population, flags, languages }) => ({
  //         name: name.official,
  //         capital: capital[0],
  //         population,
  //         flag: flags.svg,
  //         languages: Object.values(languages),
  //     })
  // );

  const listCountryItem = countries.map(country => {
    const countryElement = document.createElement('li');
    countryElement.classList.add('country-item');
    countryElement.title = 'Click me!';
    countryElement.innerHTML = `
    <li class="country-item">
    <p class="country-name">
      <img class="country-pic" src="${countryInfo.flag}" alt="Flag" width="40"
      >${countryInfo.name}
    </p>
    </li>`;

    listCountryItem.set(countryElement, country);

    console.log(countries);
  });
}

function showError() {}

// countryElement.innerHTML = `
//           <img class="country-pic" src="${country.flag}" alt="Flag" width="40">
//           <span class="country-name">${country.name}</span>`;

// function renderCountries(countries) {
//   // if (countries.length === 0) {
//   //   Notiflix.Notify.failure('Oops, there is no country with that name');
//   //   return;
//   // }

//   if (countries.length > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     return;
//   }

//   if (countries.length > 1) {
//     renderCountriesList(countries);
//     return;
//   }

//   // if (countries.length === 1)
//   renderCountryInfo(country[0]);
// }

// function renderCountry(countryInfo) {
//   refs.infoCountry.innerHTML = `
//     <h1 class="country-title">
//       <img class="country-pic" src="${countryInfo.flag}" alt="Flag" width="100"
//       >${countryInfo.name}
//     </h1>
//     <p class="country-descr"><span class="country-data">Capital: </span
//     >${countryInfo.capital}</p>
//     <p class="country-descr"><span class="country-data">Population: </span
//     >${countryInfo.population.toLocaleString()}</p>
//     <p class="country-descr"><span class="country-data">Languages: </span
//     >${countryInfo.languages.join(', ')}</p>`;
// }

// console.log(renderCountry);

// const render = () => {
//   const list = items.map(getItemtemplate);

//   refs.list.innerHTML = '';
//   refs.list.insertAdjacentHTML('beforeend', list.join(''));
// };

// function mapCountryTemplate(countries) {
//   return countries.map(({ name, capital, population, flags, languages }) => ({
//     name: name.official,
//     capital: capital[0],
//     population,
//     flag: flags.svg,
//     languages: Object.values(languages),
//   }));
// }

// const getCountryTemplate = ({
//   name,
//   capital,
//   population,
//   flags,
//   languages,
// }) => {
//   return `
//   <p class="country-info__name">${name}</p>
//   <p>${capital}</p>
//   <p>${population}</p>
//   <p>${flags}</p>
//   <p>${languages}</p>`;
// };

//   function showContainerCountry({ name: { name, capital, population, lang } }) {
//     console.log({ name: { name, capital, population, lang } });

//     const template = `<p class="country-name">${name}</p>
//     <img class="country-pic" src="" alt="Flag" width="100"</>
//     <p class="country-capital"><span>Capital: </span>${capital}</p>
//     <p><span>Population: </span>${population}</p>
//     <p><span>Language: </span>${lang}</p>`;

//     console.log(template);
//   }

//   let countryList = [];
//   function renderCountryList() {
//     const markup = countryList
//       .map(name => {
//         return `<li>${name}</li>`;
//       })
//       .join('');
//     countryList.innerHTML = markup;
//   }
//   console.log(renderCountryList());

// function showContainerCountry({ name, capital, population, lang }) {
//   console.log({ name, capital, population, lang });

//   const template = `<p class="country-name">${name}</p>
//   <img class="country-pic" src="" alt="Flag" width="100"</>
//   <p class="country-capital"><span>Capital: </span>${capital}</p>
//   <p><span>Population: </span>${population}</p>
//   <p><span>Language: </span>${lang}</p>`;

//   console.log(template);
// }

/* <h2 class="country-title">
      <img class="country-flag" src="${country.flag}" alt="Flag" width="50"
      >${country.name}
    </h2>
    <p class="country-detail"><span class="country-parameter">Capital: </span
    >${country.capital}</p>
    <p class="country-detail"><span class="country-parameter">Population: </span
    >${country.population.toLocaleString()}</p>
    <p class="country-detail"><span class="country-parameter">Languages: </span
    >${country.languages.join(', ')}</p>` */
