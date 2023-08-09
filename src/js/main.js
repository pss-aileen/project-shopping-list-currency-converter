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
     
    });
  
  
  // シンボル一覧を1つ生成する
  // from をクリックして、選んだら、そこに値を入れる
  // to をクリックして、選んだら、checkedされた値をそこに入れる
  // 国名と対応した国旗を出力させる、なければそれを出力する機能もつける


  
 




} // end