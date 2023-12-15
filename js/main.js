'use strict';
{


  class getCountrys {
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
    
    getRate() {
      fetchData(this.getApiUrl());
      async function fetchData(URL) {
        try {
          const response = await fetch(URL);
    
          if (!response.ok) {
            throw new Error("HTTP ERROR Status:", response.status);
          }
          
          const data = await response.json();
          console.log("API Response", data);
          console.log(`data.rates.${this.fromCountry}`);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }
    }
  }

  const apiUrl = "https://open.er-api.com/v6/latest/AED";

  async function fetchData() {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("HTTP ERROR Status:", response.status);
      }

      const data = await response.json();
      console.log("API Response", data);
      // console.log("TEST", data.base_code, "USD", data.rates.USD);
      // console.log(data.rates);
      // console.log(data.rates);
      // console.log(Object.keys(data.rates));
      // console.log(Object.keys(data.rates)[0]);
      // console.log(Object.keys(data.rates)[1]);

      showCountrys(data);
      getValue();
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  fetchData();

  // async function fetchData2(URL) {
  //   try {
  //     const response = await fetch(URL);

  //     if (!response.ok) {
  //       throw new Error("HTTP ERROR Status:", response.status);
  //     }
      
  //     const data = await response.json();
  //     console.log("API Response", data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error.message);
  //   }
  // }
  
  function showCountrys(data) {
    const array = Object.keys(data.rates);

    const from = document.getElementById("from");
    const to = document.getElementById("to");

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      from.appendChild(option);
    }

    for (let i = 0; i < array.length; i++) {
      const option = document.createElement("option");
      option.textContent = Object.keys(data.rates)[i];
      to.appendChild(option);
    }
  }

  function getValue() {
    const from = document.getElementById("from");
    from.addEventListener("change", () => {
      console.log(from.value);
      // makeURL(from.value);
      fetchData2(makeURL(from.value));
    });
    const to = document.getElementById("to");
    to.addEventListener("change", () => {
      console.log(to.value);
    });
  }

  function makeURL(from) {
    console.log(`https://open.er-api.com/v6/latest/${from}`);
    return `https://open.er-api.com/v6/latest/${from}`;
  }

  function getCurrency(to) {
    const country = to;

  }

}