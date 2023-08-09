'use strict'
{

  /////////////////////////////////
  // call api
  /////////////////////////////////
  
  async function callSymbolsApi() {
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

  /////////////////////////////////
  // handle symbols api
  /////////////////////////////////

  const callSymbolsApiPromise = callSymbolsApi();
  callSymbolsApiPromise
    .then((data) => {
      for (const [s, d] of Object.entries(data)) {
        console.log(`${s}: ${d}`);
      }
      data = Object.values(data["symbols"]);
      // symbolsとdescriptionの配列、オブジェクトがかえる
      console.log(data);
    });

  function countryCodes(data) {
    const array = [];
    const test = Object.values(data["symbols"]);

    const countrySet = new Object();
    countrySet.code = "tiwatiwa";
    countrySet.description = "tiwatiwa2";

    console.log(array);
  }



} // end