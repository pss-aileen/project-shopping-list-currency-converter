'use strict';

{

  // global

  let globalFrom = "";
  let globalTo = "";

  // 国一覧のAPIを呼び出す

  callApi();

  async function callApi() {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const symbols = await res.json();
    const array = Object.keys(symbols["symbols"]);
    showSymbols(array);
    setCurrencyAPIURL();
  }


  // 国一覧を from to に表示させる関数

  function showSymbols(array) {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
  
    for (let i = 0; i < array.length; i++) {
      const option = document.createElement('option');
      from.appendChild(option);
      option.textContent = array[i];
      option.value = array[i];
    }

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement('option');
      to.appendChild(option);
      option.textContent = array[i];
      option.value = array[i];
    }

    const fromSelectedIndex = localStorage.getItem("shoppingListSetCurrencyFrom");
    const toSelectedIndex = localStorage.getItem("shoppingListSetCurrencyTo");
    
    from.selectedIndex = fromSelectedIndex;
    to.selectedIndex = toSelectedIndex;

    globalFrom = localStorage.getItem("shoppingListSetCurrencyFromValue");
    globalTo = localStorage.getItem("shoppingListSetCurrencyToValue");
  }


  // from、toで選択された国をピックアップする

  const fromCurrency = document.getElementById('from');
  const toCurrency = document.getElementById('to');


  fromCurrency.addEventListener('change', () => {
    globalFrom = fromCurrency.value;
    console.log(globalFrom);
    setCurrencyAPIURL();
    // showRateSection();
  });

  toCurrency.addEventListener('change', () => {
    globalTo = toCurrency.value;
    console.log(globalTo);
    setCurrencyAPIURL();
    // showRateSection();
  });


  // fromとtoがvalueを持っているとき、currenyをもってくる
  function setCurrencyAPIURL() {
    if (fromCurrency.value && toCurrency.value) {
      console.log("set both currency");
      const APIURL = `https://api.exchangerate.host/convert?from=${globalFrom}&to=${globalTo}&places=0`;
      callApiCurrency(APIURL);
    }
  }

  let rate = 0;

  // レートを呼び出す
  async function callApiCurrency(APIURL) {
    const URL = APIURL;
    const res = await fetch(URL);
    const data = await res.json();
    rate = data.result;
    console.log("API rate: " + rate);
    
    showRateSection();
  }

  showRateSection();

  // rate-sectionにレートを表示する
  function showRateSection() {
    const section = document.querySelector('.rate-section');
    console.log("rate: " + rate);
    section.textContent = `${globalFrom} 1 = ${globalTo} ${rate}`;
  }
  



  // 買い物リストの記入と追加


  // 最初から1つめの行は解放させておく
  // ADDLISTをおすと、空欄ができあがってくる

  // 数値の記入が終わると、現地通過を入力しおわったら、目的通過の金額が更新される

  const check = document.getElementById('check');

  check.addEventListener('click', () => {
    sumAll();
    convertPriceCurrency();
  });

  function sumAll() {
    const numbers = document.querySelectorAll('.product-price');
    console.log(numbers);
    let sum = 0;
    const fromTotal = document.getElementById('from-total');

    for (let i = 0; i < numbers.length; i++) {
      const valueToNumber = Number(numbers[i].value);
      sum = sum + valueToNumber;
      console.log(sum);
    }
    fromTotal.textContent = sum;
  }

  // checkを押す
  // レートを取得
  // レートをpriceとかけて、mapかなんかして配列に入れ込む
  // priceに1つずつ表示していく

  const productsArray = [];

  function convertPriceCurrency() {
    // productnameとpriceを配列にぶちこむ
    productsArray.splice(0, productsArray.length);
    const productNames = document.querySelectorAll('.product-name');
    const productPrices = document.querySelectorAll('.product-price');

    for (let i = 0; i < productNames.length; i++) {

      const array = new Object;
      let name = productNames[i].value;
      let price = productPrices[i].value;

      if (!name) {
        name = "no name";
      }

      array.productName = name;
      array.productPrice = price;
      array.productPriceConverted = price * rate;
      console.log(array);
      productsArray.push(array);
    }
    
    const targetArea = document.querySelectorAll('.product-price-calculated');
    for (let i = 0; i < targetArea.length; i++) {
      targetArea[i].textContent = productsArray[i].productPriceConverted;
    }
    console.log(productsArray);

    const totalCalc = document.getElementById('total-calculated');

    let totalCalcSum = 0;
      
    for (let i = 0; i < productsArray.length; i++) {
      totalCalcSum = totalCalcSum + productsArray[i].productPriceConverted;
      console.log(productsArray[i].productPriceConverted);
    }

    totalCalc.textContent = totalCalcSum;
    
    // console.log(productNames);
    // console.log(productPrices);
    // console.log(namesArray);


  }



  // 更新されたら合計金額も計算する

  // btn-add-list でテーブルを追加する
  const btnAddList = document.getElementById('btn-add-list');


  btnAddList.addEventListener('click', () => {
    generateEmptyProductList();
  });

  function generateEmptyProductList() {
    const targetArea = document.querySelector('.products-list-table tbody');

    const tr = document.createElement('tr');   
    const tdProductName = document.createElement('td');   
    const tdProductPrice = document.createElement('td');
    const tdProductPriceCaluculated = document.createElement('td');
    const tdProductDelete = document.createElement('td');

    const inputProductName = document.createElement('input');
    const inputProductPrice = document.createElement('input');

    const spanProductProductPriceCaluculated = document.createElement('span');

    targetArea.appendChild(tr);
    
    tr.appendChild(tdProductName);
    tr.appendChild(tdProductPrice);
    tr.appendChild(tdProductPriceCaluculated);
    tr.appendChild(tdProductDelete);
    
    
    tr.classList.add("products-list-table__tr");
    tdProductName.classList.add("products-list-table__td");
    tdProductPrice.classList.add("products-list-table__td");
    tdProductPriceCaluculated.classList.add("products-list-table__td");
    tdProductDelete.classList.add("products-list-table__td");
    
    tdProductName.appendChild(inputProductName);
    tdProductPriceCaluculated.appendChild(spanProductProductPriceCaluculated);spanProductProductPriceCaluculated.classList.add("product-price-calculated")
    inputProductName.type = "name";
    inputProductName.value = "にんじん";



    tdProductPrice.appendChild(inputProductPrice);
    inputProductPrice.type = "number";
    inputProductPrice.value = 1;
    inputProductName.classList.add("product-name");
    inputProductPrice.classList.add("product-price");
    inputProductPrice.classList.add("products-list-table__input");

    tdProductDelete.textContent = "❌";

    console.log("生成！");
  }

  const btnStorageCurrency = document.getElementById('btn-storage-currency');

  btnStorageCurrency.addEventListener('click', () => {
    const from = document.getElementById('from');
    const to = document.getElementById('to');
    localStorage.setItem("shoppingListSetCurrencyFrom", from.selectedIndex);
    localStorage.setItem("shoppingListSetCurrencyTo", to.selectedIndex);
    localStorage.setItem("shoppingListSetCurrencyFromValue", from.value);
    localStorage.setItem("shoppingListSetCurrencyToValue", to.value);
  });

} // end

