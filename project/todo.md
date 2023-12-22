# TODO

## 1221
- 通貨をアップデートで....これはあとでいいや

## 共通化できるはず？のもの
- LOCAL_CURRENCY と RATE を計算する関数

- 値をあらゆる箇所にセットする関数
  - localCurrency, foreignCurrency, shopping listの配列
- 配列を展開する関数



common currency https://gist.github.com/ksafranski/2973986

## 整理
- APIから選択肢をひっぱってくる
- localCurrency値の決定
- foreignCurrecy値の決定
  - localCurrencyのAPIより、rateを計算
  - shoppingListのcurrency変更
  - shoppingList追加済みの商品のlocalPrice * rate = ForeignPriceを計算する


- shopping list にidをつける

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
  - データを呼び出す場所は？
    - localCurrency, foreignCurrency
    - shoppingList一覧の値全て
    - 上記2つは連動している必要がある、rateの関係上
  - rateが変更された場合の挙動をどうするか？
    - foreignCurrencyの変更
      - それぞれの金額、合計金額の再計算or再表示
    - localCurrencyの変更
      - すでにShopppingListに保存されている、表示されているものがある場合
        - CAUTIONを出す（※レートが変更されているので、再度金額をご確認ください的な）
        - 値段は一応設定は変えないようにしておく
        - 一括でショッピングリストを削除できるようにしておく（設定済み）


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