const getCurrency = async () => {
  const currencyJsonUrl = "../data/common-currency.json";

  const response = await fetch(currencyJsonUrl);
  const data = await response.json();

  // console.log(data);

  return data;
}

export default getCurrency

