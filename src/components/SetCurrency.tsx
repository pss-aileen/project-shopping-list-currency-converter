import React, { useEffect, useState } from 'react'
import Button from './Button'
import CurrencyInputForm from './CurrencyInputForm'
import getCurrency from '../utils/getCurrencyCode'

const SetCurrency = () => {
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    async function getCurrencyData() {
      const data = await getCurrency();
      setSymbols(data);
    }
    getCurrencyData();
  }, []);

  console.log(symbols);

  return (
    <section className='setCurrency'>
      <CurrencyInputForm />
      <CurrencyInputForm />
      <Button>SAVE CURRENCY</Button>
    </section>
  )
}

export default SetCurrency