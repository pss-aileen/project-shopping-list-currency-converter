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

  function updateInputCurrency() {
    LOCAL_CURRENCY = document.getElementById("input-local-currency").value;
    FOREIGN_CURRENCY = document.getElementById("input-foreign-currency").value;
  }

  async function updateRate() {
    const data = await fetchData(`https://open.er-api.com/v6/latest/${LOCAL_CURRENCY}`);
    RATE = data.rates[FOREIGN_CURRENCY];
    console.log("UPDATED RATE", RATE);
    return data.rates[FOREIGN_CURRENCY];
  }

  async function setValues() {
    console.log("SET VALUE");
    const localPrice = document.getElementById("local-price");
    const foreignPrice = document.getElementById("foreign-price");

    updateRate().then(() => {
      foreignPrice.textContent = GET_foreignPrice(localPrice.value, 4);
    });
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
  
  // class Currency {
  //   constructor(localCurrency, foreignCurrency) {
  //     this.localCurrency = localCurrency;
  //     this.foreignCurrency = foreignCurrency;
  //     LOCAL_CURRENCY = this.localCurrency;
  //     FOREIGN_CURRENCY = this.foreignCurrency;
  //     console.log(`LOCAL_CURRENCY: ${LOCAL_CURRENCY}, FOREIFN_CURRENCY: ${FOREIGN_CURRENCY}`);
  //   }
  // }
 
  /******************************************************
    CURRENCY一覧取得、初期値の設定
  ******************************************************/
  
  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

  InitLoadFunction();

  async function InitLoadFunction() {
    const data = await fetchData("https://open.er-api.com/v6/latest/AED");
    const currencyCodes = Object.keys(data.rates);
    // console.log(currencyCodes);
    generateCurrencyOptions(currencyCodes, inputLocalCurrency, LOCAL_CURRENCY);
    generateCurrencyOptions(currencyCodes, inputForeignCurrency, FOREIGN_CURRENCY);
    setValues();
    updateShoppingListCurrency();
  }

  function generateCurrencyOptions(currencyCodes, selectElement, selectedCurrencyCode) {
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
    updateInputCurrency();
    setValues();
    updateShoppingListCurrency();
  }

  function updateShoppingListCurrency() {
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
    // updateRate();
    changeValue();
  });

  /******************************************************
    Shopping List
  ******************************************************/


  /******************************************************
    Shopping List追加
  ******************************************************/
  
  const shoppingListLocalCurrency = document.getElementById("shopping-list-local-currency");
  const shoppingListForeignCurrency = document.getElementById("shopping-list-foreign-currency");
  
  const CreateListBtn = document.getElementById("btn-create-shoppping-list-element");

  CreateListBtn.addEventListener("click", () => {
    const productNameElement = document.getElementById("new-product");
    const localPriceElement = document.getElementById("new-local-price");

    const productName = productNameElement.value;
    const localPrice = Number(localPriceElement.value);
    
    const div_item = createNewElement("div", ["shopping-list__item"], null);

    const div_productName = createNewElement("div", ["shopping-list__product-name"], null);
    const span_productNmae = createNewElement("span", null, productName);

    const div_productPrice = createNewElement("div", ["shopping-list__product-price"], null);
    const table = createNewElement("table", null, null);
    const tr_local = createNewElement("tr", null, null);
    const td_localValue = createNewElement("td", ["get-product-local-price"], localPrice);
    const td_foreignValue = createNewElement("td", ["get-product-foreign-price"], GET_foreignPrice(localPrice, 2));
    const tr_foreign = createNewElement("tr", null, null);
    const td_localCurrency = createNewElement("td", null, LOCAL_CURRENCY);
    const td_foreignCurrency = createNewElement("td", null, FOREIGN_CURRENCY);

    const div_delete = createNewElement("div", ["shopping-list__delete"], null);
    const i_deleteIcon = createNewElement("i", ["shopping-list__delete-icon", "bi", "bi-x-lg"], null);

    const targetElement = document.getElementById("shopping-list-content");

    targetElement.appendChild(div_item);
    appendChildren(div_item, [div_productName, div_productPrice, div_delete]);
    appendChildren(div_productName, [span_productNmae]);
    appendChildren(div_productPrice, [table]);
    appendChildren(table, [tr_local, tr_foreign])
    appendChildren(tr_local, [td_localValue, td_localCurrency]);
    appendChildren(tr_foreign, [td_foreignValue, td_foreignCurrency]);
    appendChildren(div_delete, [i_deleteIcon]);

    const object = {
      "id": SHOPPING_LISTS.length,
      "productName": productName,
      "localPrice": localPrice
    }

    SHOPPING_LISTS.push(object);

    const localAmount = document.getElementById("shopping-list-total-local-value");
    const foreignAmount = document.getElementById("shopping-list-total-foreign-value");

    let amount = 0;
    for (let i = 0; i < SHOPPING_LISTS.length; i++) {
      const value = SHOPPING_LISTS[i]["localPrice"];
      amount = amount + value;
    }
    localAmount.textContent = amount;
    foreignAmount.textContent = GET_foreignPrice(amount, 2);

    function createNewElement(tagName, classNames, textContent) {
      const element = document.createElement(tagName);
      if (classNames) {
        element.classList.add(...classNames);
      }
      if (textContent) {
        element.textContent = textContent;
      }
      return element;
    }

    function appendChildren(parent, children) {
      children.forEach(child => parent.appendChild(child));
    }

  });


  document.getElementById("btn-recalc").addEventListener("click", () => {
    updateForeignPrice();
  });

  function updateForeignPrice() {
    const foreignPriceElements = document.querySelectorAll(".get-product-foreign-price");

    for (let i = 0; i < SHOPPING_LISTS.length; i++) {
      const localPrice = SHOPPING_LISTS[i]["localPrice"];
      const NewForeignPrice = GET_foreignPrice(localPrice, 2);
      foreignPriceElements[i].textContent = NewForeignPrice;
    }
  }




}