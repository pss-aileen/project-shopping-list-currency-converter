'use strict';
{

  /******************************************************
    グローバル変数
  ******************************************************/
  
  let LOCAL_CURRENCY = "";
  let FOREIGN_CURRENCY = "";
  let RATE = "";
  const shoppingProducts = [];

  /******************************************************
    ローカルストレージ
  ******************************************************/
  
  function saveOnLocalStorage() {
    const currencySetting = {
      "localCurrency": ValuesManager.localCurrency,
      "ForeignCurrency": ValuesManager.foreignCurrency,
      "rate": ValuesManager.rate
    };

    const shoppingList = {

    }
  }

  /******************************************************
    class Currency
    currencyをsetし、関連の値をを呼び出す
  ******************************************************/
  
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
      generateCurrencyOptions(data, inputLocalCurrency, "MYR");
      generateCurrencyOptions(data, inputForeignCurrency, "JPY");
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


  /******************************************************
    Currency変更、値を変更した時に発火するイベント
  ******************************************************/
  
  inputLocalCurrency.addEventListener("input", changeValue);
  inputForeignCurrency.addEventListener("input", changeValue);
  document.getElementById("local-price").addEventListener("change", changeValue);


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
  
  const CreateListBtn = document.getElementById("btn-create-shoppping-list-element");

  CreateListBtn.addEventListener("click", () => {
    const productName = document.getElementById("new-product");
    const localPrice = document.getElementById("new-local-price");

    const item = new Product(productName.value, localPrice.value, 30.4027);
    
    // console.log(item.getProductNameString());
    // console.log(item.getProductLocalPriceNumber());
    // console.log(item.getProductForeignPriceNumber());

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