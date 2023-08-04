// // call symbols api
// async function callSymbolsApi() {
//   const res = await fetch("https://api.exchangerate.host/symbols");
//   const symbols = await res.json();
//   const array = Object.keys(symbols["symbols"]);
//   // console.log(array);
//   // showSymbols(array);
//   // setCurrencyAPIURL();
//   return array;
// }

// export { callSymbolsApi };


// call api promise
// function callApi() {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       resolve('Cloudy')
//     }, 100)
//   })
// }

// function getWeatherIcon(weather) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       switch (weather) {
//         case 'Sunny':
//           resolve('🌞');
//           break;
//         case 'Cloudy':
//           resolve('🌥️');
//           break;
//         default:
//           reject('NO ICON');
//       }
//     }, 100)
//   })
// }

// function onSuccess(data) {
//   console.log(`Success ${data}`);
// }

// function onError(error) {
//   console.log(`Error param ${error}`);
// }

// callApi()
//   .then(getWeatherIcon)
//   .then(onSuccess, onError);