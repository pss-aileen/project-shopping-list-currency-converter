'use strict';
{

  class Currency {
    constructor(localCurrency, foreignCurrency) {
      this.localCurrency = localCurrency;
      this.foreignCurrency = foreignCurrency;
    }

    getApiUrl() {
      return `https://open.er-api.com/v6/latest/${this.localCurrency}`;
    }

    getLocalCurrencyString() {
      return this.localCurrency;
    }

    getForeignCurrencyString() {
      return this.foreignCurrency;
    }

    async getRate() {
      try {
        const response = await fetch(this.getApiUrl());
        if (!response.ok) {
          throw new Error("HTTP ERROR STATUS", response.status);
        }

        const data = await response.json();
        return data.rates[this.foreignCurrency];
      } catch (error) {
        console.error("EROOR FETCHING DATA", error.message);
      }
    }

    async setValues() {
      const localPrice = document.getElementById("local-price");
      const localCurrency = document.getElementById("local-currency");
      const foreignPrice = document.getElementById("foreign-price");
      const foreignCurrency = document.getElementById("foreign-currency");

      this.getRate().then(rate => {
        localCurrency.textContent = this.getLocalCurrencyString();
        foreignCurrency.textContent = this.getForeignCurrencyString();
        foreignPrice.textContent = (rate * localPrice.value).toFixed(4);
      });
     }
  }
 
  
  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

  fetchInitData();
  
  async function fetchInitData() {
    const apiUrl = "https://open.er-api.com/v6/latest/AED";
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("HTTP ERROR Status:", response.status);
      }

      const data = await response.json();
      console.log("API Response", data);
      generateCurrencyOptions(data, inputLocalCurrency, "JPY");
      generateCurrencyOptions(data, inputForeignCurrency, "MYR");
      changeValue();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  function generateCurrencyOptions(data, selectElement, selectedCurrencyCode) {
    const currencyCodes = Object.keys(data.rates);

    for (const code of currencyCodes) {
      const option = document.createElement("option");
      option.textContent = code;
      if (code === selectedCurrencyCode) {
        option.selected = true;
      }
      selectElement.appendChild(option);
    }
  }
 
  function changeValue() {
    const data = new Currency(inputLocalCurrency.value, inputForeignCurrency.value);
    data.setValues();
  }

  inputLocalCurrency.addEventListener("input", changeValue);
  inputForeignCurrency.addEventListener("input", changeValue);
  document.getElementById("local-price").addEventListener("change", changeValue);

}