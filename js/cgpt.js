// リファクタリングコメント: 関数の宣言をアロー関数に変更し、コンパクトにまとめる

// リファクタリングコメント: 同じ DOM 要素の取得をまとめて、変数名を変更
const getInputValue = (elementId) => document.getElementById(elementId).value;

// リファクタリングコメント: 非同期関数の宣言をアロー関数に変更し、コンパクトにまとめる
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// リファクタリングコメント: 非同期関数の宣言をアロー関数に変更し、コンパクトにまとめる
const updateRate = async () => {
  const data = await fetchData(`https://open.er-api.com/v6/latest/${LOCAL_CURRENCY}`);
  RATE = data.rates[FOREIGN_CURRENCY];
  console.log("UPDATED RATE", RATE);
  return data.rates[FOREIGN_CURRENCY];
};

// リファクタリングコメント: 関数の呼び出しとログの出力をまとめる
const setPrices = async () => {
  console.log("SET PRICES");
  const localPrice = document.getElementById("local-price");
  const foreignPrice = document.getElementById("foreign-price");

  await updateRate();
  foreignPrice.textContent = GET_foreignPrice(localPrice.value, 4);
};

// リファクタリングコメント: 同じ DOM 要素の取得をまとめ、変数名を変更
const updateShoppingListCurrency = () => {
  const shoppingListLocalCurrency = document.getElementById("shopping-list-local-currency");
  const shoppingListForeignCurrency = document.getElementById("shopping-list-foreign-currency");
  shoppingListLocalCurrency.textContent = LOCAL_CURRENCY;
  shoppingListForeignCurrency.textContent = FOREIGN_CURRENCY;
};

// リファクタリングコメント: 関数の呼び出しをまとめる
function changeValue() {
  updateInputCurrency();
  setPrices();
  updateShoppingListCurrency();
}

// リファクタリングコメント: 同じ DOM 要素の取得をまとめ、変数名を変更
const updateInputCurrency = () => {
  LOCAL_CURRENCY = getInputValue("input-local-currency");
  FOREIGN_CURRENCY = getInputValue("input-foreign-currency");
};
