'use strict';
{

  /******************************************************
    グローバル変数
  ******************************************************/
  
  let LOCAL_CURRENCY = "MYR";
  let FOREIGN_CURRENCY = "JPY";
  let RATE = 0;
  const shoppingProducts = [];

  /******************************************************
    ローカルストレージ
  ******************************************************/
  
  document.getElementById("btn-save").addEventListener("click", () => {
    saveOnLocalStorage();
  });
  
  function saveOnLocalStorage() {
    const currencySetting = {
      "localCurrency": LOCAL_CURRENCY,
      "ForeignCurrency": FOREIGN_CURRENCY,
      "rate": RATE,
      "storageDate": new Date()
    };

    const shoppingList = {

    }
    localStorage.setItem("currencySetting", JSON.stringify(currencySetting));
    localStorage.setItem("shoppingList", JSON.stringify(shoppingProducts));
    console.log(localStorage.getItem("currencySetting"), localStorage.getItem("shoppingList"));
  }

  /******************************************************
    class Currency
    currencyをsetし、関連の値をを呼び出す
  ******************************************************/
  
  class Currency {
    constructor(localCurrency, foreignCurrency) {
      this.localCurrency = localCurrency;
      this.foreignCurrency = foreignCurrency;
      LOCAL_CURRENCY = this.localCurrency;
      FOREIGN_CURRENCY = this.foreignCurrency;
      console.log(`LOCAL_CURRENCY: ${LOCAL_CURRENCY}, FOREIFN_CURRENCY: ${FOREIGN_CURRENCY}`);
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
        RATE = data.rates[this.foreignCurrency];
        console.log("RATE", RATE);
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
 
  /******************************************************
    CURRENCY一覧取得、初期値の設定
  ******************************************************/
  
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
      generateCurrencyOptions(data, inputLocalCurrency, LOCAL_CURRENCY);
      generateCurrencyOptions(data, inputForeignCurrency, FOREIGN_CURRENCY);
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
    LOCAL_CURRENCY = inputLocalCurrency.value;
    FOREIGN_CURRENCY = inputForeignCurrency.value;
    const data = new Currency(LOCAL_CURRENCY, FOREIGN_CURRENCY);
    data.setValues();
    shoppingListLocalCurrency.textContent = LOCAL_CURRENCY;
    shoppingListForeignCurrency.textContent = FOREIGN_CURRENCY;
  }


  /******************************************************
    Currency変更、値を変更した時に発火するイベント
  ******************************************************/
  
  inputLocalCurrency.addEventListener("input", changeValue);
  inputForeignCurrency.addEventListener("input", changeValue);
  document.getElementById("local-price").addEventListener("change", changeValue);

  document.getElementById("btn-swap-currency").addEventListener("click", () => {
    [LOCAL_CURRENCY, FOREIGN_CURRENCY] = [FOREIGN_CURRENCY, LOCAL_CURRENCY];
    inputLocalCurrency.value = LOCAL_CURRENCY;
    inputForeignCurrency.value = FOREIGN_CURRENCY;
    changeValue();
  });

  /******************************************************
    Shopping List
  ******************************************************/

  class Product {
    constructor(productName, localPrice, rate) {
      this.productName = productName;
      this.localPrice = localPrice;
      this.rate = rate;
    }

    getProductNameString() {
      return this.productName;
    }

    getProductLocalPriceNumber() {
      return Number(this.localPrice);
    }

    getProductForeignPriceNumber() {
      return (this.rate * Number(this.localPrice)).toFixed(2);
      // return this.rate * Number(this.localPrice);
    }
  }

  /******************************************************
    Shopping List追加
  ******************************************************/
  
  const shoppingListLocalCurrency = document.getElementById("shopping-list-local-currency");
  const shoppingListForeignCurrency = document.getElementById("shopping-list-foreign-currency");
  
  const CreateListBtn = document.getElementById("btn-create-shoppping-list-element");

  CreateListBtn.addEventListener("click", () => {
    const productName = document.getElementById("new-product");
    const localPrice = document.getElementById("new-local-price");

    const item = new Product(productName.value, localPrice.value, RATE);
    
    const tr = document.createElement("tr");
    const td01 = document.createElement("td");
    const td02 = document.createElement("td");
    const td03 = document.createElement("td");

    td01.textContent = item.getProductNameString();
    td02.textContent = item.getProductLocalPriceNumber();
    td03.textContent = item.getProductForeignPriceNumber();

    const shoppingList = document.getElementById("shopping-list-content");

    shoppingList.appendChild(tr);
    tr.appendChild(td01);
    tr.appendChild(td02);
    tr.appendChild(td03);

    const object = {
      "productName": item.getProductNameString(),
      "localPrice": item.getProductLocalPriceNumber()
    }

    shoppingProducts.push(object);
    console.log(shoppingProducts);
  });


}