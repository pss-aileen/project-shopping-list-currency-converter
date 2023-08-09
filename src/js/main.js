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

  // call json

  async function callJson() {
    try {
      const response = await fetch("json/country-currency.json");
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
      const callJsonPromise = callJson();
      callJsonPromise
        .then((data2) => {
          combineArray(data, data2);
        });
    });
  
  

  
 

  
  
  function combineArray(data, data2) {
    console.log(data);
    console.log(data2);
    const array = [];

    pickCountryName(data, data2);
    
    for (let i = 0; i < data.length; i++) {
      const currencyCode = data[i].code;
      const currencyCodeName = data[i].description;
  
      const line = new Object;
      line.currencyCode = currencyCode;
      line.currencyCodeName = currencyCodeName;
      line.countryName = "";
      line.countryIcon = "";

      // currencyCode or CurrencyCodeNameを他のオブジェクトと照らし合わせる
      // 検索させる
      // 同じものがあれば、そこの配列から国名をひっこぬいてくる

      // console.log(line);
    }
  }

  function pickCountryName(data1, data2) {
    for (let i = 0; i < data1.length; i++) {
      const countryName = data1[i].code;
      // console.log(countryName);
      for (let j = 0; j < data2.length; j++) {
        const countryNameMatch = data2[j].currency_code;
        if (countryName === countryNameMatch) {
          const countrydata = data2[j].country;
          // console.log(countrydata + i + ":" + + j);
          console.log(`${i} ${data1[i].code} ${data1[i].description} ${j} ${data2[j].currency_code} ${data2[j].country}`);
          // console.log(j);
        }
      }
    }


  }

  function pickCountryFlag() {

  }



  

  // シンボル一覧を1つ生成する
  // from をクリックして、選んだら、そこに値を入れる
  // to をクリックして、選んだら、checkedされた値をそこに入れる
  // 国名と対応した国旗を出力させる、なければそれを出力する機能もつける

  // カーレンシーの略と、国をリンクさせる
  // 国とアイコン表示用の省略語をリンクさせる
  // countryArray = [{ countryName: "COUNTRY NAME", currencyCode: "CDE", countryIcon: "am"}]; みたいな
  // これを別フォルダで生成して保存しておいて、ここから情報をとってきて、APIにつっこむ


} // end