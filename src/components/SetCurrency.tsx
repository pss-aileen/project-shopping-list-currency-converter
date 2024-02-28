import React, { useEffect, useState } from 'react'
import Button from './Button'
import CurrencyInputForm from './CurrencyInputForm'
import getCurrency from '../utils/getCurrencyCode'

interface CurrencyInputFormProps {
  symbols: {
    [key: string]: {
      symbol: string,
      name: string,
      symbol_native: string,
      decimal_digits: number,
      rounding: number,
      code: string,
      name_plural: string
    }
  };
}


const SetCurrency = () => {
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [symbols, setSymbols] = useState<CurrencyInputFormProps['symbols'] | undefined>(undefined);

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
      <CurrencyInputForm symbols={symbols} />
      <CurrencyInputForm symbols={symbols} />
      <Button>SAVE CURRENCY</Button>
    </section>
  )
}

export default SetCurrency