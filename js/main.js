'use strict';
{


  // 国を取得して、それぞれで実行する
  class Countries {
    constructor(fromCountry, toCountry) {
      this.fromCountry = fromCountry;
      this.toCountry = toCountry;
    }

    getApiUrl() {
      return `https://open.er-api.com/v6/latest/${this.fromCountry}`;
    }

    getToCountryString() {
      return this.toCountry;
    }

    async getRate() {
      return new Promise(resolve => {
        async function fetchData(URL, country) {
          try {
            console.log(URL, country);
            const response = await fetch(URL);
            if (!response.ok) {
              throw new Error("HTTP ERROR Status:", response.status);
            }
  
            const data = await response.json();
            // console.log("API Response", data);
            const rate = await data.rates[country];
            console.log(rate);
            return rate;
          } catch (error) {
            console.error("Error fetching data:", error.message);
          }
        }
        resolve(fetchData(this.getApiUrl(), this.toCountry));
      });
    }

  }


  // 初期ロード時、selectを作る
  const apiUrl = "https://open.er-api.com/v6/latest/AED";

  fetchData();

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("HTTP ERROR Status:", response.status);
      }

      const data = await response.json();
      console.log("API Response", data);
      // console.log("TEST", data.base_code, "USD", data.rates.USD);
      // console.log(Object.keys(data.rates));
      showCountrys(data);
      // getValue();

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

 
  function showCountrys(data) {
    const array = Object.keys(data.rates);

    const from = document.getElementById("from");
    const to = document.getElementById("to");

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      if (Object.keys(data.rates)[i] === "JPY") {
      // if (i === 0) {
        option.selected = true;
      }
      from.appendChild(option);
    }

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      // if (i === 0) {
      if (Object.keys(data.rates)[i] === "MYR") {
        option.selected = true;
      }
      to.appendChild(option);
    }
  }


  const from = document.getElementById("from");
  const to = document.getElementById("to");

  // const initData = new Countries(from.value, to.value);
  // console.log(initData, initData.getRate());

  from.addEventListener("input", async () => {
    // console.log(from.value);
    const fromData = new Countries(from.value, to.value);
    const rate = await fromData.getRate();
    console.log(fromData.fromCountry, fromData.getApiUrl(), fromData.getToCountryString(), rate);
  });

  to.addEventListener("input", async () => {
    const toData = new Countries(from.value, to.value);
    const rate = await toData.getRate();
    console.log(toData.fromCountry, toData.getApiUrl(), toData.getToCountryString(), rate);
  });
  


}