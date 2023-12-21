'use strict';

// 通貨情報を管理するクラス
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
        throw new Error(`HTTP ERROR Status: ${response.status}`);
      }

      const data = await response.json();
      return data.rates[this.foreignCurrency];
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  setValues() {
    const localPrice = document.getElementById("local-price");
    const localCurrencyElem = document.getElementById("local-currency");
    const foreignPriceElem = document.getElementById("foreign-price");
    const foreignCurrencyElem = document.getElementById("foreign-currency");

    // 通貨レートを非同期で取得し、画面に反映
    this.getRate().then(rate => {
      localCurrencyElem.textContent = this.getLocalCurrencyString();
      foreignCurrencyElem.textContent = this.getForeignCurrencyString();
      foreignPriceElem.textContent = (rate * localPrice.value).toFixed(4);
    });
  }
}

// APIからデータを取得する関数
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ERROR Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// 通貨選択のセレクトボックスを生成
function generateCurrencyOptions(data, selectElem, selectedCurrencyCode) {
  const currencyCodes = Object.keys(data.rates);

  for (const code of currencyCodes) {
    const option = document.createElement("option");
    option.textContent = code;
    if (code === selectedCurrencyCode) {
      option.selected = true;
    }
    selectElem.appendChild(option);
  }
}

// 初期化処理
async function init() {
  const apiUrl = "https://open.er-api.com/v6/latest/AED";
  const data = await fetchData(apiUrl);

  const inputLocalCurrency = document.getElementById("input-local-currency");
  const inputForeignCurrency = document.getElementById("input-foreign-currency");

  // 初期データをセット
  generateCurrencyOptions(data, inputLocalCurrency, "JPY");
  generateCurrencyOptions(data, inputForeignCurrency, "MYR");

  const initData = new Currency(inputLocalCurrency.value, inputForeignCurrency.value);
  initData.setValues();
}

// イベントリスナーの設定
const inputLocalCurrency = document.getElementById("input-local-currency");
const inputForeignCurrency = document.getElementById("input-foreign-currency");

inputLocalCurrency.addEventListener("input", init);
inputForeignCurrency.addEventListener("input", init);
document.getElementById("local-price").addEventListener("change", init);

// 初期化関数を実行
init();
