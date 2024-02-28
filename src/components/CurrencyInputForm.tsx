import React from 'react'

interface CurrencyInputFormProps {
  symbols?: {
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

const CurrencyInputForm: React.FC<CurrencyInputFormProps> = ({ symbols }) => {

  if (!symbols) {
    return <div>Loading...</div>; // または他の適切なフィードバックをユーザーに提供
  }

  return (
    <div className='input-item-wrapper'>
      <input type="text" placeholder='0' />
      <select name="" id="">
        {Object.keys(symbols).map((key) => (
          <option key={key} value={key}>{symbols[key].code}</option>
        ))}
      </select>
    </div>
  )
}

export default CurrencyInputForm