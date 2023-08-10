'use strict'
{


  /////////////////////////////////
  // call api
  /////////////////////////////////
  
  async function callSymbolsApi() {
    try {
      const response = await fetch(
        "https://api.exchangerate.host/symbols",
      )
      if (!response.ok) {
        throw new Error(`HTTPS error: ${response.status}`);
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }


  /////////////////////////////////
  // handle symbols api
  /////////////////////////////////

  const callSymbolsApiPromise = callSymbolsApi();
  callSymbolsApiPromise
    .then((data) => {
      for (const [s, d] of Object.entries(data)) {
        console.log(`${s}: ${d}`);
      }
      // console.log(data);
      return data = Object.values(data["symbols"]);
      // symbolsとdescriptionの配列、オブジェクトがかえる
    })
    .then((data) => {
      showSymbols(data);
      searchSymbols();
      setCurrency();
    });
  
  
  function showSymbols(array) {
    // console.log(array);
    // console.log(array[0].code);
    const output = document.querySelector('.country-lists');

    for (let i = 0; i < array.length; i++) {
      const li = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');
      const divCode = document.createElement('div');
      const divDescription = document.createElement('div');

      output.appendChild(li);
      li.appendChild(label);
      label.appendChild(input);
      label.appendChild(divCode);
      label.appendChild(divDescription);

      li.classList.add("country-lists__item");
      label.classList.add("country");
      input.classList.add("country__input-radio");
      divCode.classList.add("country__code");
      divDescription.classList.add("country__description");

      input.setAttribute("type", "radio");
      input.setAttribute("name", "countries");

      input.value = array[i].code;
      divCode.textContent = array[i].code;
      divDescription.textContent = array[i].description;

      // console.log("created");
    }
  }

  function searchSymbols() {
    const input = document.querySelector(".country-search__input");
    const dataArray = document.querySelectorAll(".country-lists .country__input-radio");
    // 余裕があればフルネームで検索できるようにしたい、一旦保留
    // 検索
    input.addEventListener('input', () => {
      const data = input.value;
      const regex = new RegExp(data, "i");
      console.log(`input: ${regex}`);

      for (let i = 0; i < dataArray.length; i++) {
        if (regex.test(dataArray[i].value)) {
          // console.log("matach");
          // console.log(dataArray[i].value);
          dataArray[i].classList.remove('is_displayNone');
        } else {
          dataArray[i].classList.add('is_displayNone');
        }
      }

    });
  }


  function setCurrency() {
    const btnFrom = document.querySelector("#btn-set-from");
    const btnTo = document.querySelector("#btn-set-to");
    console.log(btnFrom);
    const modal = document.querySelector('.country-lists-modal');

    btnFrom.addEventListener('click', () => {
      modal.classList.add('is_show');
      pickUpAndSet("from");
    })

    btnTo.addEventListener('click', () => {
      modal.classList.add('is_show');
      pickUpAndSet("to");
    })
    

  }

  function pickUpAndSet(place) {
    const modal = document.querySelector('.country-lists-modal');
    const countries = document.querySelectorAll("input[name='countries']");

    // console.log(countries);

    const targetFrom = document.getElementById('from-currency');
    const targetTo = document.getElementById('to-currency');

    countries.forEach(country => {
      country.addEventListener('click', () => {
        country.checked = false;
        if (place === "from") {
          modal.classList.remove('is_show');
          return targetFrom.textContent = country.value;
          // console.log("fromまわってる");
        } else if (place === "to") {
          modal.classList.remove('is_show');
          return targetTo.textContent = country.value;
          // console.log("toまわってる");
        }
      })
    });

    // values.forEach(value => {
    //   value.addEventListener('click', () => {
    //     modal.classList.remove('is_show');
    //     console.log(`target: ${target.textContent}`);
    //     console.log(value.ariaChecked);
    //     target.textContent = value.value;
    //     // console.log("naze");
    //   })
    // });

    console.log("-----");
  }
  
  // シンボル一覧を1つ生成する
  // from をクリックして、選んだら、そこに値を入れる
  // to をクリックして、選んだら、checkedされた値をそこに入れる
  // 国名と対応した国旗を出力させる、なければそれを出力する機能もつける


  
 




} // end