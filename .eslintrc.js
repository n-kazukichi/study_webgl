module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts'],
      },
    },
  },
  rules: {
    // errorメッセージ等、consoleで表示することが多いため。
    'no-console': 'off',
    // 各種フラグの指定等に|でbit演算を頻繁に行うため。
    'no-bitwise': 'off',
    // GLint等、グローバルな型定義を使うため。
    'no-undef': 'off',
    // import時、以下の拡張子のファイルは省略
    'import/extensions': [
      'error',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
}
