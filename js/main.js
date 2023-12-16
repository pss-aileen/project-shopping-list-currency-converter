'use strict';
{

  // 国を取得して、それぞれで実行する
  class Countries {
    constructor(localCurrency, foreignCurrency) {
      this.localCurrency = localCurrency;
      this.foreignCurrency = foreignCurrency;
    }

    getApiUrl() {
      return `https://open.er-api.com/v6/latest/${this.localCurrency}`;
    }

    getlocalCurrencyString() {
      return this.localCurrency;
    }

    getforeignCurrencyString() {
      return this.foreignCurrency;
    }

    async getRate() {
      return new Promise(resolve => {
        async function fetchData(URL, country) {
          try {
            // console.log(URL, country);
            const response = await fetch(URL);
            if (!response.ok) {
              throw new Error("HTTP ERROR Status:", response.status);
            }
  
            const data = await response.json();
            // console.log("API Response", data);
            const rate = await data.rates[country];
            // console.log(rate);
            return rate;
          } catch (error) {
            console.error("Error fetching data:", error.message);
          }
        }
        resolve(fetchData(this.getApiUrl(), this.foreignCurrency));
      });
    }

    async showDisplay() {
      const localCurrency = document.getElementById("local-currency");
      localCurrency.textContent = this.getlocalCurrencyString();
      const localPrice = document.getElementById("local-price");
      const foreignPrice = document.getElementById("foreign-price");
      const value = await await this.getRate();
      foreignPrice.textContent = (value * localPrice.value).toFixed(4);

      const foreignCurrency = document.getElementById("foreign-currency");
      foreignCurrency.textContent = this.getforeignCurrencyString();
     }
  }


  // 初期ロード時、selectを作る
  const apiUrl = "https://open.er-api.com/v6/latest/AED";

  fetchData();

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("HTTP ERROR Status:", response.status);
      }

      const data = await response.json();
      console.log("API Response", data);
      // console.log("TEST", data.base_code, "USD", data.rates.USD);
      // console.log(Object.keys(data.rates));
      showCountrys(data);
      init();
      // getValue();

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

 
  function showCountrys(data) {
    const array = Object.keys(data.rates);

    const from = document.getElementById("from");
    const to = document.getElementById("to");

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      if (Object.keys(data.rates)[i] === "JPY") {
      // if (i === 0) {
        option.selected = true;
      }
      from.appendChild(option);
    }

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      // if (i === 0) {
      if (Object.keys(data.rates)[i] === "MYR") {
      // if (Object.keys(data.rates)[i] === "USD") {
        option.selected = true;
      }
      to.appendChild(option);
    }
  }


  const from = document.getElementById("from");
  const to = document.getElementById("to");

  async function init() {
    const initData = new Countries(from.value, to.value);
    const initRate = await initData.getRate();
    initData.showDisplay();
  }

  const btn = document.getElementById("btn-get-currency");

  // btn.addEventListener("click", async () => {
  //   const data = new Countries(from.value, to.value);
  //   const rate = await data.getRate();
  //   data.showDisplay();
  // });

  from.addEventListener("input", async () => {
    const data = new Countries(from.value, to.value);
    const rate = await data.getRate();
    data.showDisplay();
  });

  to.addEventListener("input", async () => {
    const data = new Countries(from.value, to.value);
    const rate = await data.getRate();
    data.showDisplay();
  });
  

  document.getElementById("local-price").addEventListener("change", async () => {
    const data = new Countries(from.value, to.value);
    const rate = await data.getRate();
    data.showDisplay();
  });

}