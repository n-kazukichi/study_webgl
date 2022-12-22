# study_webgl

初めてのWebGL 2
https://www.oreilly.co.jp/books/9784873119373/

を写経してゆくリポジトリ。

本のサンプルは、バニラなjsをhtmlに直書きなため  
IDEのアシストを受けづらく、辛み深いため作成。

## 使い方
---
本のチャプターごとなど、写経用ソースを src/XX.ts を作成。

`webpack.config,js` に写経用ソースを登録
```
  entry: {
    ch01: './src/ch01.ts',
    ch02: './src/ch02.ts'
    ch02_1: './src/ch02_1.ts'
  },
  など

```


`yarn build` 

html配下に フォルダに ch02_1.js など、tsと同名のファイルが
出力されるので、それをよみこむhtmlを作成。

