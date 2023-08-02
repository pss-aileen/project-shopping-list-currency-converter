'use strict';

{

 

  async function callApi() {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const symbols = await res.json();
    // console.log(res);
    // console.log(symbols);
    // console.log(Object.keys(symbols["symbols"]));
    
    showData(symbols);
    // return Object.keys(symbols["symbols"]);
  }

  callApi();

  function showData(symbols) {
    const symbolsOnly = Object.keys(symbols["symbols"]);
    console.log(symbolsOnly.length);
  }


// responsiオブジェクトに通信が成功したかのかとかを表示してくれるらしい

  

  // async function loadCountrySymbols() {
  //   const API_URL = 'https://api.exchangerate.host/symbols';
  //   const result = await fetch(API_URL);
  //   const data = await result.json();
  //   let symbolList = data.symbols;
  //   console.log(symbolList);
  // }

  // loadCountrySymbols();

}
