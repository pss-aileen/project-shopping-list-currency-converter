'use strict';
{
  
  /******************************************************
    グローバル変数
  ******************************************************/
  
  let LOCAL_CURRENCY = "MYR";
  let FOREIGN_CURRENCY = "JPY";
  let RATE = 0;
  const SHOPPING_LISTS = [];

  /******************************************************
    テスト、実験として色々なものは共通化
  ******************************************************/
  
  // 小数点を任意の長朝で丸める関数
  function roundToDecimalPlace(number, decimalPlace) {
    return number.toFixed(decimalPlace);
  }

  // foreign priceを計算する関数
  function calculateForeignPrice(localPrice) {
    return localPrice * RATE;
  }

  // 最終的な出力結果はこれにする...？
  function GET_foreignPrice(localPrice, desimalPlace) {
    let result = calculateForeignPrice(localPrice);
    result = roundToDecimalPlace(result, desimalPlace);
    return result;
  }

  async function fetchData(URL) {
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error("HTTP ERROR STATUS", response.status);
      }
      const data = await response.json();
      console.log(`URL: ${URL}`, data);
      return data;
    } catch (error) {
      console.error("EROOR FETCHING DATA", error.message);
    }
  }

  /******************************************************
    initLoad
    - CURRENCY一覧を取得する、selectに入れる、初期値を設定する
    - localStorageの内容確認、データがあれば反映させる（まずはfunctionでまとめる）
    - 
  ******************************************************/
  
  /******************************************************
    Currency Symbols
  ******************************************************/
  
  async function GET_CURRENCY_SYMBOL() {
    const result = await fetchData("https://gist.githubusercontent.com/ksafranski/2973986/raw/5fda5e87189b066e11c1bf80bbfbecb556cf2cc1/Common-Currency.json");
    console.log(result);
  }

  GET_CURRENCY_SYMBOL();
  

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

    localStorage.setItem("currencySetting", JSON.stringify(currencySetting));
    localStorage.setItem("shoppingList", JSON.stringify(SHOPPING_LISTS));
  }

  /******************************************************
   LocalStorage 呼び出し
   ******************************************************/
  
  document.getElementById("btn-call-local-storage").addEventListener("click", () => {
    CallFromLocalStorage();
  });
  
  function CallFromLocalStorage() {
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

    async updateRate() {
      const data = await fetchData(this.getApiUrl());
      RATE = data.rates[this.foreignCurrency];
      return data.rates[this.foreignCurrency];
    }

    async setValues() {
      const localPrice = document.getElementById("local-price");
      const foreignPrice = document.getElementById("foreign-price");

      this.updateRate().then(() => {
        foreignPrice.textContent = GET_foreignPrice(localPrice.value, 4);
      });
     }
  }
 
  /******************************************************
    CURRENCY一覧取得、初期値の設定
  ******************************************************/
  
  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

  InitLoadFunction();

  async function InitLoadFunction() {
    const data = await fetchData("https://open.er-api.com/v6/latest/AED");
    const currencyCodes = Object.keys(data.rates);
    console.log(currencyCodes);
    generateCurrencyOptions(currencyCodes, inputLocalCurrency, LOCAL_CURRENCY);
    generateCurrencyOptions(currencyCodes, inputForeignCurrency, FOREIGN_CURRENCY);
    changeValue();
  }


  function generateCurrencyOptions(data, selectElement, selectedCurrencyCode) {
    // const currencyCodes = Object.keys(data.rates);
    const currencyCodes = data;

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
      // return roundToTwoDecimalPlaces(this.rate * Number(this.localPrice));
      // return this.rate * Number(this.localPrice);
      return "結果考え中...";
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
    
    const div_item = document.createElement("div");
    const div_productName = document.createElement("div");
    const span_productNmae = document.createElement("span");
    const div_productPrice = document.createElement("div");
    const table = document.createElement("table");
    const tr_local = document.createElement("tr");
    const tr_foreign = document.createElement("tr");
    const td_localValue = document.createElement("td");
    const td_foreignValue = document.createElement("td");
    const td_localCurrency = document.createElement("td");
    const td_foreignCurrency = document.createElement("td");
    const div_delete = document.createElement("div");
    const i_deleteIcon = document.createElement("i");

    div_item.classList.add("shopping-list__item");
    div_productName.classList.add("shopping-list__product-name");
    div_productPrice.classList.add("shopping-list__product-price");
    div_delete.classList.add("shopping-list__delete");
    i_deleteIcon.classList.add("shopping-list__delete-icon", "bi", "bi-x-lg");

    span_productNmae.textContent = item.getProductNameString();
    td_localValue.textContent = item.getProductLocalPriceNumber();
    td_localValue.classList.add("get-product-local-price");
    // td_foreignValue.textContent = item.getProductForeignPriceNumber();
    td_foreignValue.textContent = GET_foreignPrice(item.getProductLocalPriceNumber(), 2);
    td_foreignValue.classList.add("get-product-foreign-price");
    td_localCurrency.textContent = LOCAL_CURRENCY;
    td_foreignCurrency.textContent = FOREIGN_CURRENCY;

    const shoppingList = document.getElementById("shopping-list-content");

    shoppingList.appendChild(div_item);
    div_item.appendChild(div_productName);
    div_item.appendChild(div_productPrice);
    div_item.appendChild(div_delete);
    div_productName.appendChild(span_productNmae);
    div_productPrice.appendChild(table);
    table.appendChild(tr_local);
    table.appendChild(tr_foreign);
    tr_local.appendChild(td_localValue);
    tr_local.appendChild(td_localCurrency);
    tr_foreign.appendChild(td_foreignValue);
    tr_foreign.appendChild(td_foreignCurrency);
    div_delete.appendChild(i_deleteIcon);

    const object = {
      "id": SHOPPING_LISTS.length,
      "productName": item.getProductNameString(),
      "localPrice": item.getProductLocalPriceNumber()
    }

    SHOPPING_LISTS.push(object);

    console.log(SHOPPING_LISTS);

    const localAmount = document.getElementById("shopping-list-total-local-value");
    const foreignAmount = document.getElementById("shopping-list-total-foreign-value");

    let amount = 0;
    for (let i = 0; i < SHOPPING_LISTS.length; i++) {
      const value = SHOPPING_LISTS[i]["localPrice"];
      amount = amount + value;
    }
    localAmount.textContent = amount;
    foreignAmount.textContent = GET_foreignPrice(amount, 2);
  });


  document.getElementById("btn-recalc").addEventListener("click", () => {
    reCalculateForeignValue(RATE);
  });

  function reCalculateForeignValue(RATE) {
    const array = document.querySelectorAll(".get-product-local-price");
    const array2 = document.querySelectorAll(".get-product-foreign-price");

    console.log(array, array2);

    // for (const value of array) { 
    //   console.log(value.textContent);
    // }

    for (let i = 0; i < array.length; i++) {
      console.log(array[i].textContent);
      const localPrice =  Number(array[i].textContent);
      const NewForeignPrice = GET_foreignPrice(localPrice, 2);
      // console.log(array2[i].textContent);
      array2[i].textContent = NewForeignPrice;
      // console.log(array2[i].textContent);
    }
    
  }



}