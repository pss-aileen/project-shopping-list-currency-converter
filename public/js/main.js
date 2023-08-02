'use strict';

{

  async function callApi() {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const symbols = await res.json();
    const array = Object.keys(symbols["symbols"]);
    showData(symbols);
    showCurrency(array);
  }

  callApi();

  function showData(symbols) {
    const symbolsOnly = Object.keys(symbols["symbols"]);
    // const symbolsOnly = Object.keys(symbols);
    // console.log(symbolsOnly);
    // console.log(symbolsOnly.length);
    console.log(symbols.symbols);
    console.log(symbols.symbols.code);
    // const test = JSON.parse(symbols.symbols);
    // console.log(test);

  }

  function showCurrency(array) {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
  
    for (let i = 0; i < array.length; i ++) {
      const option = document.createElement('option');
      from.appendChild(option);
      option.textContent = array[i];
      option.value = array[i];
    }

    for (let i = 0; i < array.length; i ++) {
      const option = document.createElement('option');
      to.appendChild(option);
      option.textContent = array[i];
      option.value = array[i];
    }
  }


  callApiCurrency();
  // currency 
  async function callApiCurrency() {
    const URL = "https://api.exchangerate.host/convert?from=MYR&to=JPY&places=0";
    const res = await fetch(URL);
    const data = await res.json();
    const rate = data.result;
    console.log(data);
    console.log(rate);
  }

}