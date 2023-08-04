import { CallSymbolsApi } from "./modules/CallSymbolsApi.js";


// grobal変数
let globalFrom = "";
let globalTo = "";


// symbolsを呼び出す
const promise = CallSymbolsApi();
promise
.then((data) =>
Object.keys(data["symbols"])
)
.then((data) => {
    const from = document.getElementById('from')
    const to = document.getElementById('to')
    console.log(data)
    showSymbols(from, data)
    showSymbols(to, data)
    pickUpSymbols()
  })
  ;
  
// 以下、一旦コード整理

// 通貨記号を表示させる関数
// from,to共有の作業を切り出す

function showSymbols(where, array) {
  console.log("showSymbols start");

  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');
    where.appendChild(option);
    option.textContent = array[i];
    option.value = array[i];
  }

  console.log("showSymbols done");
}

// localStorageのデータをもってくる
function getSymbolsSettingFromLocalStorage(target) {
  let data = "";
  if (target === "from") {
    localStorage.getItem("shoppingListSetCurrencyFrom");
  } else if (target === "to") {
    localStorage.getItem("shoppingListSetCurrencyTo");
  }

  return data;
}

// localStorageからもってきた値を、from, toにセットする
function setLocalSorageSymbolsOnHTML(where, localStorageData) {
  where.toSelectedIndex = localStorageData;
  if (where === "from") {
    globalFrom = localStorage.getItem("shoppingListSetCurrencyFromValue");
  } else if (where === "to") {
    globalTo = localStorage.getItem("shoppingListSetCurrencyToValue");
  }
}

function pickUpSymbols() {
  const from = document.getElementById('from');
  const to = document.getElementById('to');

  from.addEventListener('change', () => {
    globalFrom = from.value;
    console.log(globalFrom);
    setCurrencyAPI(globalFrom, globalTo);
    // API呼び出しが必要...？
  })

  to.addEventListener('change', () => {
    globalTo = to.value;
    console.log(globalTo);
    setCurrencyAPI(globalFrom, globalTo);
    // API呼び出しが必要...？
  })
}

function setCurrencyAPI(fromSymbols, toSymbols) {
  if (fromSymbols && toSymbols) {
    console.log("set both currency");
    const APIURL = `https://api.exchangerate.host/convert?from=${fromSymbols}&to=${toSymbols}&places=0`;

    return APIURL;
  }

}