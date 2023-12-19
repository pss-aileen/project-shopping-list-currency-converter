# TODO

## 1219
- 合計金額の表示
  - 配列に商品と金額を入れていく
  - 商品追加ごとに合計を表示
  - rateとかけあわせて表示する
- 元のrateを保持する localStorage
  - 選択したlocal,foreiginCurrency, を保存できるようにする
  - 「設定を保存」
  - 「設定を呼び出す」
  - 最終的には常に保存しているデータを呼び出してくる


## 段階
- APIを使って、簡単な為替レートを計算できるものを作る
  - 2つの国を設定
  - レートを取得
  - 1が何になるか表示
  - 国旗や正式名称などは表示できなくても良い
- 数値を入力して、反映されるようにする
- 装飾は最低限で良い、自分だけがわかれば良い
- 別のファイルを作成し、リストの追加、削除ができるものを作る
- 作れたら、数値を入れれるようにして、計算できるようにする
- 組み合わせる

- https://open.er-api.com/v6/latest/JPY
- https://www.exchangerate-api.com/docs/free

# メモ

## 定数名、id候補
- country
- origin < - > destination
- local currency, foreign currency