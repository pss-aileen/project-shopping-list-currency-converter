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
