/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ch01.ts":
/*!*********************!*\
  !*** ./src/ch01.ts ***!
  \*********************/
/***/ (() => {

eval("// GLの厳密モード\n\nlet gl;\nconst setErrorMessage = (msg) => {\n    console.error(msg);\n    const error = document.getElementById('error');\n    if (!error) {\n        return;\n    }\n    error.innerText = msg;\n};\nconst CANVAS_ELM_NAME = 'webgl-canvas';\n// 写経のために...で書いたが 引数はちゃんと定義したほうが好み\n// const updateClearColor = (...col: [number, number, number, number]) => {\n//   gl.clearColor(...col)\nconst updateClearColor = (r, g, b, a) => {\n    gl.clearColor(r, g, b, a);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.viewport(0, 0, 0, 0);\n};\nconst checkKey = (ev) => {\n    // 文字コードは非推奨になったらしい。\n    // ev.code: 'Digit1' や 'LeftAlt' 'KeyA' など\n    // Altなど複数ある同じキーでも、左右どちら？がわかる。\n    // ev.key: '1' や 'Alt' 'a' など\n    // Caps状態やShiftを押している場合\n    // アルファベットが大小どちらで入力された？もわかる。\n    // console.log('ev', ev.code, ev.key)\n    switch (ev.code) {\n        case 'Digit1': { // red\n            updateClearColor(1, 0, 0, 1);\n            break;\n        }\n        case 'Digit2': { // green\n            updateClearColor(0, 1, 0, 1);\n            break;\n        }\n        case 'Digit3': { // blue\n            updateClearColor(0, 0, 1, 1);\n            break;\n        }\n        case 'Digit4': { // rand\n            updateClearColor(Math.random(), Math.random(), Math.random(), 1);\n            break;\n        }\n        case 'KeyA': { // rand\n            const color = gl.getParameter(gl.COLOR_CLEAR_VALUE);\n            console.log(`r=${color[0].toFixed(1)},g=${color[1].toFixed(1)},b=${color[2].toFixed(1)}`);\n            break;\n        }\n    }\n};\n/**\n * 初期化\n */\nconst init = () => {\n    const canvas = document.getElementById(CANVAS_ELM_NAME);\n    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {\n        // 要素無かった || canvas タグじゃなかった の場合エラー。\n        setErrorMessage('Canvas要素無いですよ');\n        return;\n    }\n    const context = canvas.getContext('webgl2');\n    if (!context) {\n        setErrorMessage('WebGL2.0使えるブラウザではない。');\n        return;\n    }\n    gl = context;\n    window.onkeydown = checkKey;\n};\nwindow.onload = init;\n\n\n//# sourceURL=webpack://webgl/./src/ch01.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/ch01.ts"]();
/******/ 	
/******/ })()
;