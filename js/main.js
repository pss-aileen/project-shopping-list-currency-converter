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
            const response = await fetch(URL);
            if (!response.ok) {
              throw new Error("HTTP ERROR Status:", response.status);
            }
  
            const data = await response.json();
            const rate = await data.rates[country];
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
      showCountrys(data);
      init();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

 
  function showCountrys(data) {
    const array = Object.keys(data.rates);

    const inputLocalCurrency = document.getElementById("input-local-currency");
    const inputForeignCurrency = document.getElementById("input-foreign-currency");

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      if (Object.keys(data.rates)[i] === "JPY") {
      // if (i === 0) {
        option.selected = true;
      }
      inputLocalCurrency.appendChild(option);
    }

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      // if (i === 0) {
      if (Object.keys(data.rates)[i] === "MYR") {
        option.selected = true;
      }
      inputForeignCurrency.appendChild(option);
    }
  }


  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

  async function init() {
    const initData = new Countries(inputLocalCurrency.value, inputForeignCurrency.value);
    const initRate = await initData.getRate();
    initData.showDisplay();
  }

  const btn = document.getElementById("btn-get-currency");

  inputLocalCurrency.addEventListener("input", async () => {
    const data = new Countries(inputLocalCurrency.value, inputForeignCurrency.value);
    const rate = await data.getRate();
    data.showDisplay();
  });

  inputForeignCurrency.addEventListener("input", async () => {
    const data = new Countries(inputLocalCurrency.value, inputForeignCurrency.value);
    const rate = await data.getRate();
    data.showDisplay();
  });
  

  document.getElementById("local-price").addEventListener("change", async () => {
    const data = new Countries(inputLocalCurrency.value, inputForeignCurrency.value);
    const rate = await data.getRate();
    data.showDisplay();
  });

}