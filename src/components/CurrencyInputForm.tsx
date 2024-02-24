import React from 'react'

const CurrencyInputForm = () => {

  // propsで国一覧のデータをフェッチして、ここに受け渡してくる
  // selectで展開する
  // そのselectが変更されたら、useStateで更新して、SetCurrency、Appに値を返す
  // その値をもとにリストも変更できるようにする

  return (
    <div className='input-item-wrapper'>
      <input type="text" placeholder='0' />
      <select name="" id="">
        <option value="">MYR</option>
      </select>
    </div>
  )
}

export default CurrencyInputForm