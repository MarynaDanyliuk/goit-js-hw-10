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

  const nameCountry = refs.input.value.trim();

  if (nameCountry === '') {
    clearCountryElements();
    return;
  }
  //   const nameCountry = event.target.value.trim();
  fetchCountries(nameCountry)
    .then(renderCountries)
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
  clearCountryElements();
  console.log(`выполняем HTTP запрос`);
}

// __________FUNCTIONS___________________

function renderCountries(nameCountry) {
  const { name, capital, population, flags, languages } = nameCountry;

  const countries = nameCountry.map(
    ({ name, capital, population, flags, languages }) => ({
      name: name.official,
      capital: capital[0],
      population,
      flag: flags.svg,
      languages: Object.values(languages),
    })
  );

  console.log(countries);

  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    clearCountryElements();
    return;
  } else if (countries.length === 1) {
    clearCountryElements(refs.listCountry.innerHTML);
    // refs.listCountry.innerHTML = '';
    // console.log(`Хочу уже это сделать!`);
    renderContainerCountry(countries);
  } else if (1 < countries.length < 10) {
    renderListCountry(countries);
  }
}

function renderListCountry(countries) {
  const listCountryItems = countries.map(country => {
    const listCountryItem = document.createElement('li');
    const listCountryPicElement = document.createElement('img');
    listCountryItem.classList.add('country-item');
    listCountryItem.textContent = country.name;
    listCountryPicElement.classList.add('country-pic');
    listCountryItem.innerHTML = `<li class="country-item">
    <img class="country-pic" src="${country.flag}" alt="Flag" width="40">${country.name}
    </li>`;
    return listCountryItem;
  });

  refs.listCountry.append(...listCountryItems);
}

function renderContainerCountry(countries) {
  const country = countries[0];
  refs.infoCountry.innerHTML = `<h1 class="country-title">
      <img class="country-pic" src="${country.flag}" alt="Flag" width="40">${country.name}</h1>
      <p class="country-descr"><span class="country-data">Capital: </span>${country.capital}</p>
      <p class="country-descr"><span class="country-data">Population: </span>${country.population}</p>
      <p class="country-descr"><span class="country-data">Languages: </span>${country.languages}</p>`;
}

function clearCountryElements() {
  refs.listCountry.innerHTML = '';
  refs.infoCountry.innerHTML = '';
}

// refs.infoCountry.innerHTML = country
//   .map(({ name, capital, population, flags, languages }) => {
//     return `<h1 class="country-title">
//     <img class="country-pic" src="${flags.svg}" alt="Flag" width="40">${
//       name.official
//     }</h1>
//     <p class="country-descr"><span class="country-data">Capital: </span>${capital}</p>
//     <p class="country-descr"><span class="country-data">Population: </span>${population}</p>
//     <p class="country-descr"><span class="country-data">Languages: </span>${Object.values(
//       languages
//     )}</p>`;
//   })
//   .join(``);

// function createCountryData(nameCountry) {
//   const { name, capital, population, flags, languages } = nameCountry;
//   // console.log(nameCountry);
//   const countries = nameCountry.map(
//     ({ name, capital, population, flags, languages }) => ({
//       name: name.official,
//       capital: capital[0],
//       population,
//       flag: flags.svg,
//       languages: Object.values(languages),
//     })
//   );
//   return countries;
// }

// console.log(createCountryData);

// const { name, capital, population, flags, languages } = nameCountry[0];
// const countries = nameCountry.map(
//   ({ name, capital, population, flags, languages }) => ({
//     name: name.official,
//     capital: capital[0],
//     population,
//     flag: flags.svg,
//     languages: Object.values(languages),
//   })
// );
// const countryInfo = countries[0];

// refs.infoCountry.innerHTML = `
//   <h1 class="country-title">
//     <img class="country-pic" src="${country.flag}" alt="Flag" width="40"
//     >${country.name}
//   </h1>
//   <p class="country-descr"><span class="country-data">Capital: </span
//   >${country.capital}</p>
//   <p class="country-descr"><span class="country-data">Population: </span
//   >${countryInfo.population.toLocaleString()}</p>
//   <p class="country-descr"><span class="country-data">Languages: </span
//   >${countryInfo.languages.join(', ')}</p>`;

// function showError(error) {
//   Notiflix.Notify.failure(`Перепрошую, у вас помилка`);
// }

// if (countries.length > 10) {
//   Notiflix.Notify.info(
//     'Too many matches found. Please enter a more specific name.'
//   );
//   return;
// }

// `
//           <li class="country-item">
//             <img class="country-pic" src="${countries.flag}" alt="Flag" width="40"
//             >${countries.name}
//           </li>`;

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
