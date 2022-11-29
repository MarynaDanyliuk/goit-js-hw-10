export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Oops, there is no country with that name');
      }
      throw new Error(response.status);
    }

    return response.json();
  });
}

// https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

// export function fetchCountries(name) {
//   const requestString = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
//   return fetch(requestString).then(response => {
//     if (!response.ok) {
//       if (response.status === 404) {
//         // return [];
//         throw new Error('Oops, there is no country with that name');
//       }

//       throw new Error(
//         `Response status: ${response.statusText}. Code ${response.status}.`
//       );
//     }

//     return response.json();
//   });
// }
