module.exports = {
  mode: 'development',

  entry: {
    // チャプターごとに定義
    ch01: './src/ch01.ts',
    ch02: './src/ch02.ts'
//    ch03: './src/ch03.ts'...
  },
  output: {
    // chXX,jsがhtmlディレクトリに配置されるように。
    filename: '[name].js',
    path: __dirname + '/html'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  }
};