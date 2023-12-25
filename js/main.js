'use strict';
{
  /******************************************************
    グローバル変数
  ******************************************************/
  let LOCAL_CURRENCY = "JPY";
  let FOREIGN_CURRENCY = "USD";
  let RATE = 0;
  let SHOPPING_LISTS = [];

  /******************************************************
    テスト、実験として色々なものは共通化
  ******************************************************/
  function roundToDecimalPlace(number, decimalPlace) {
    return number.toFixed(decimalPlace);
  }

  function calculateForeignPrice(localPrice) {
    return localPrice * RATE;
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

  
  function GET_foreignPrice(localPrice, desimalPlace) {
    let result = calculateForeignPrice(localPrice);
    result = roundToDecimalPlace(result, desimalPlace);
    return result;
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
      "foreignCurrency": FOREIGN_CURRENCY,
      "rate": RATE,
      "storageDate": new Date()
    };
    console.log(currencySetting);
    localStorage.setItem("currencySetting", JSON.stringify(currencySetting));
  }
  
  document.getElementById("btn-save-shopping-list").addEventListener("click", () => {
    localStorage.setItem("shoppingList", JSON.stringify(SHOPPING_LISTS));
    console.log(SHOPPING_LISTS);
  });

  /******************************************************
   LocalStorage 呼び出し
   ******************************************************/
  callLocalStorageCurrency();
  
  function callLocalStorageCurrency() {
    const currencySettingFromLocalStorage = JSON.parse(localStorage.getItem("currencySetting"));
    console.log(currencySettingFromLocalStorage);

    LOCAL_CURRENCY = currencySettingFromLocalStorage["localCurrency"];
    FOREIGN_CURRENCY = currencySettingFromLocalStorage["foreignCurrency"];
    console.log(LOCAL_CURRENCY, FOREIGN_CURRENCY);
    // changeValue();

    document.getElementById("input-local-currency").value = LOCAL_CURRENCY;
    document.getElementById("input-foreign-currency").value = FOREIGN_CURRENCY;
    setPrices();
    updateShoppingListCurrency();
  }
  
  document.getElementById("btn-call-shopping-list").addEventListener("click", () => {
    const shoppingListFromLocalStorage = JSON.parse(localStorage.getItem("shoppingList"));
    console.log(shoppingListFromLocalStorage);
    console.log(SHOPPING_LISTS);
    SHOPPING_LISTS = shoppingListFromLocalStorage;
    createShoppingListElement();
  });



  /******************************************************
    CURRENCY一覧取得、初期値の設定
  ******************************************************/
  
  InitLoadFunction();

  async function InitLoadFunction() {
    const data = await fetchData("https://open.er-api.com/v6/latest/AED");
    const currencyCodes = Object.keys(data.rates);
    appendChildren(document.getElementById("input-local-currency"), currencyCodes, LOCAL_CURRENCY);
    appendChildren(document.getElementById("input-foreign-currency"), currencyCodes, FOREIGN_CURRENCY);
    setPrices();
    updateShoppingListCurrency();
  }

  function appendChildren(selectElement, currencyCodes, selectedCurrencyCode) {
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
    setPrices();
    updateShoppingListCurrency();
  }

  function updateInputCurrency() {
    console.log("UPDATE INPUT CURRENCY");
    LOCAL_CURRENCY = document.getElementById("input-local-currency").value;
    FOREIGN_CURRENCY = document.getElementById("input-foreign-currency").value;
  }

  async function setPrices() {
    console.log("SET PRICES");
    const localPrice = document.getElementById("local-price");
    const foreignPrice = document.getElementById("foreign-price");

    updateRate().then(() => {
      foreignPrice.textContent = GET_foreignPrice(localPrice.value, 4);
    });
  }

  async function updateRate() {
    const data = await fetchData(`https://open.er-api.com/v6/latest/${LOCAL_CURRENCY}`);
    RATE = data.rates[FOREIGN_CURRENCY];
    console.log("UPDATED RATE", RATE);
    return data.rates[FOREIGN_CURRENCY];
  }

  function updateShoppingListCurrency() {
    document.getElementById("shopping-list-local-currency").textContent = LOCAL_CURRENCY;
    document.getElementById("shopping-list-foreign-currency").textContent = FOREIGN_CURRENCY;
  }

  /******************************************************
    Currency変更、値を変更した時に発火するイベント
  ******************************************************/
  
  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

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


  /******************************************************
    Shopping List追加
  ******************************************************/
  
  const CreateListBtn = document.getElementById("btn-create-shoppping-list-element");

  CreateListBtn.addEventListener("click", () => {
    const productNameElement = document.getElementById("new-product");
    const localPriceElement = document.getElementById("new-local-price");

    const productName = productNameElement.value;
    const localPrice = Number(localPriceElement.value);

    if (!productName || !localPrice) {
      console.log("入力してください");
      return;
    }

    const object = {
      // "date": new Date(),
      "productName": productName,
      "localPrice": localPrice
    }

    SHOPPING_LISTS.push(object);
    
    createShoppingListElement();

    productNameElement.value = "";
    localPriceElement.value = "";
  });

  function createShoppingListElement() {
    const targetElement = document.getElementById("shopping-list-content");
    while (targetElement.firstChild) {
      targetElement.removeChild(targetElement.firstChild);
    }

    for (const product of SHOPPING_LISTS) {
      const div_item = createNewElement("div", ["shopping-list__item"], null);
      const div_productName = createNewElement("div", ["shopping-list__product-name"], null);
      const span_productNmae = createNewElement("span", null, product["productName"]);
      const div_productPrice = createNewElement("div", ["shopping-list__product-price"], null);
      const table = createNewElement("table", null, null);
      const tr_local = createNewElement("tr", null, null);
      const td_localValue = createNewElement("td", ["get-product-local-price"], product["localPrice"]);
      const td_foreignValue = createNewElement("td", ["get-product-foreign-price"], GET_foreignPrice(product["localPrice"], 2));
      const tr_foreign = createNewElement("tr", null, null);
      const td_localCurrency = createNewElement("td", null, LOCAL_CURRENCY);
      const td_foreignCurrency = createNewElement("td", null, FOREIGN_CURRENCY);
      const div_delete = createNewElement("div", ["shopping-list__delete"], null);
      const i_deleteIcon = createNewElement("i", ["shopping-list__delete-icon", "bi", "bi-x-lg"], null);
  
      targetElement.appendChild(div_item);
      appendChildren(div_item, [div_productName, div_productPrice, div_delete]);
      appendChildren(div_productName, [span_productNmae]);
      appendChildren(div_productPrice, [table]);
      appendChildren(table, [tr_local, tr_foreign])
      appendChildren(tr_local, [td_localValue, td_localCurrency]);
      appendChildren(tr_foreign, [td_foreignValue, td_foreignCurrency]);
      appendChildren(div_delete, [i_deleteIcon]);
    }
    
    let amount = 0;
    for (let i = 0; i < SHOPPING_LISTS.length; i++) {
      const value = SHOPPING_LISTS[i]["localPrice"];
      amount = amount + value;
    }
    document.getElementById("shopping-list-total-local-value").textContent = amount;
    document.getElementById("shopping-list-total-foreign-value").textContent = GET_foreignPrice(amount, 2);

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
  }


  // document.getElementById("btn-recalc").addEventListener("click", () => {
  //   updateForeignPrice();
  // });

  function updateForeignPrice() {
    const foreignPriceElements = document.querySelectorAll(".get-product-foreign-price");

    for (let i = 0; i < SHOPPING_LISTS.length; i++) {
      const localPrice = SHOPPING_LISTS[i]["localPrice"];
      const NewForeignPrice = GET_foreignPrice(localPrice, 2);
      foreignPriceElements[i].textContent = NewForeignPrice;
    }
  }

  document.getElementById("btn-delete-shopping-list").addEventListener("click", () => {
    SHOPPING_LISTS = [];
    createShoppingListElement();
  });


}