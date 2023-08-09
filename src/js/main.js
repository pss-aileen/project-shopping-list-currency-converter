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

      console.log(Object.values(data));
      console.log(Object.values(data["symbols"]));
      const test = Object.values(data["symbols"]);

      for (let i = 0; i < test.length; i++) {
        console.log(test[i].code);
        console.log(test[i].description);
      }
    });

  function countryCodes(data) {
    const array = [];
    
  }



} // end