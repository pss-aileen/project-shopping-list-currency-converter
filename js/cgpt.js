// イベントリスナーのコールバック関数を定義
CreateListBtn.addEventListener("click", () => {
  // HTML要素の取得
  const productNameElement = document.getElementById("new-product");
  const localPriceElement = document.getElementById("new-local-price");

  // 入力値の取得
  const productName = productNameElement.value;
  const localPrice = Number(localPriceElement.value);

  // 新しいアイテムを作成
  const div_item = createNewElement("div", "shopping-list__item");
  const div_productName = createNewElement("div", "shopping-list__product-name");
  const span_productNmae = createNewElement("span");
  const div_productPrice = createNewElement("div", "shopping-list__product-price");
  const table = createNewElement("table");
  const [tr_local, tr_foreign] = createMultipleElements(["tr", "tr"]);
  const [td_localValue, td_foreignValue, td_localCurrency, td_foreignCurrency] =
      createMultipleElements(["td", "td", "td", "td"]);
  const div_delete = createNewElement("div", "shopping-list__delete");
  const i_deleteIcon = createNewElement("i", "shopping-list__delete-icon", "bi", "bi-x-lg");

  // 要素にクラスを追加
  span_productNmae.textContent = productName;
  td_localValue.textContent = localPrice;
  td_localValue.classList.add("get-product-local-price");
  td_foreignValue.textContent = GET_foreignPrice(localPrice, 2);
  td_foreignValue.classList.add("get-product-foreign-price");
  td_localCurrency.textContent = LOCAL_CURRENCY;
  td_foreignCurrency.textContent = FOREIGN_CURRENCY;

  // ショッピングリストに新しいアイテムを追加
  const shoppingList = document.getElementById("shopping-list-content");
  appendChildren(div_item, [div_productName, div_productPrice, div_delete]);
  appendChildren(div_productName, [span_productNmae]);
  appendChildren(div_productPrice, [table]);
  appendChildren(table, [tr_local, tr_foreign]);
  appendChildren(tr_local, [td_localValue, td_localCurrency]);
  appendChildren(tr_foreign, [td_foreignValue, td_foreignCurrency]);
  appendChildren(div_delete, [i_deleteIcon]);
  shoppingList.appendChild(div_item);

  // ショッピングリストデータを更新
  const object = {
      "id": SHOPPING_LISTS.length,
      "productName": productName,
      "localPrice": localPrice
  };
  SHOPPING_LISTS.push(object);

  // 合計金額を更新
  updateTotalAmount();
});

// 複数の子要素を持つ新しいHTML要素を作成
function createNewElement(tagName, ...classNames) {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  return element;
}

// 複数のHTML要素を作成して配列で返す
function createMultipleElements(tags) {
  return tags.map(tag => createNewElement(tag));
}

// 親要素に複数の子要素を追加
function appendChildren(parent, children) {
  children.forEach(child => parent.appendChild(child));
}

// 合計金額を更新する関数
function updateTotalAmount() {
  const localAmount = document.getElementById("shopping-list-total-local-value");
  const foreignAmount = document.getElementById("shopping-list-total-foreign-value");

  let amount = SHOPPING_LISTS.reduce((sum, item) => sum + item.localPrice, 0);
  localAmount.textContent = amount;
  foreignAmount.textContent = GET_foreignPrice(amount, 2);
}
