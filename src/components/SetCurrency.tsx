import React from 'react'
import Button from './Button'


const SetCurrency = () => {
  return (
    <section className='setCurrency'>
      <div>
        <input type="text" placeholder='0' />
        <select name="" id="">
          <option value="">MYR</option>
        </select>
      </div>
      <div>
        <input type="text" placeholder='0' />
        <select name="" id="">
          <option value="">JPY</option>
        </select>
      </div>

      <Button>SAVE CURRENCY</Button>
    </section>
  )
}

export default SetCurrency