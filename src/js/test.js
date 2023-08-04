// API呼び出し

// 成功
console.log("リクエストを開始...");

async function fetchSymbols() {
  try {
    const response = await fetch(
      "https://api.exchangerate.host/symbols",
    )
    if (!response.ok) {
      throw new Error(`HTTPS error: ${response.status}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

const promise = fetchSymbols();
promise
  .then((data) =>
    console.log(data.symbols)
  );

// 成功 END


// fetch API を呼び出している
// fetchPromiseに代入している
// const fetchPromise = fetch(
//   "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
// );

// console.log(fetchPromise);

async function fetchProducts() {
  try {
    const response = await fetch(
      "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
    )
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data[0].name);
    return data;
  } catch (error) {
    console.error(`Could not get products: ${error}`);
  }
}

// const promise = fetchProducts();
// promise.then((data) => console.log(data[0].name));
// fetchProducts();




// フェッチして、responseの内容にデータがはいってきて、成功したら内容が表示される
// fetchPromise
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   })
//   .catch((error) => {
//     console.error(`Could not get products: ${error}`);
//   });


// fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].name);
//   });

// fetchPromise.then((response) => {
//   const jsonPromise = response.json();
//   jsonPromise.then((data) => {
//     console.log(`レスポンスを受信: ${response.status}`);
//     console.log(`値: ${data[0].name}`);
//   });
// });

