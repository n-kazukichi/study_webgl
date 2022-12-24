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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/utils */ \"./src/js/utils.ts\");\n\n// GLの厳密モード\n'use strict';\nlet gl;\nconst setErrorMessage = (msg) => {\n    console.error(msg);\n    const error = document.getElementById('error');\n    if (!error) {\n        return;\n    }\n    error.innerText = msg;\n};\nconst CANVAS_ELM_NAME = 'webgl-canvas';\n// 写経のために...で書いたが 引数はちゃんと定義したほうが好み\n// const updateClearColor = (...col: [number, number, number, number]) => {\n//   gl.clearColor(...col)\nconst updateClearColor = (r, g, b, a) => {\n    gl.clearColor(r, g, b, a);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.viewport(0, 0, 0, 0);\n};\nconst checkKey = (ev) => {\n    // 文字コードは非推奨になったらしい。\n    // ev.code: 'Digit1' や 'LeftAlt' 'KeyA' など\n    // Altなど複数ある同じキーでも、左右どちら？がわかる。\n    // ev.key: '1' や 'Alt' 'a' など\n    // Caps状態やShiftを押している場合\n    // アルファベットが大小どちらで入力された？もわかる。\n    // console.log('ev', ev.code, ev.key)\n    switch (ev.code) {\n        case 'Digit1': { // red\n            updateClearColor(1, 0, 0, 1);\n            break;\n        }\n        case 'Digit2': { // green\n            updateClearColor(0, 1, 0, 1);\n            break;\n        }\n        case 'Digit3': { // blue\n            updateClearColor(0, 0, 1, 1);\n            break;\n        }\n        case 'Digit4': { // rand\n            updateClearColor(Math.random(), Math.random(), Math.random(), 1);\n            break;\n        }\n        case 'KeyA': { // rand\n            const color = gl.getParameter(gl.COLOR_CLEAR_VALUE);\n            console.log(`r=${color[0].toFixed(1)},g=${color[1].toFixed(1)},b=${color[2].toFixed(1)}`);\n            break;\n        }\n    }\n};\n/**\n * 初期化\n */\nconst init = () => {\n    const canvas = (0,_js_utils__WEBPACK_IMPORTED_MODULE_0__.getCanvas)(CANVAS_ELM_NAME);\n    if (!canvas) {\n        // 要素無かった || canvas タグじゃなかった の場合エラー。\n        setErrorMessage('Canvasを取得できませんでした。');\n        return;\n    }\n    const context = (0,_js_utils__WEBPACK_IMPORTED_MODULE_0__.getGLContext)(canvas);\n    if (!context) {\n        setErrorMessage('WebGL2.0使えるブラウザではない。');\n        return;\n    }\n    gl = context;\n    window.onkeydown = checkKey;\n};\nwindow.onload = init;\n\n\n//# sourceURL=webpack://webgl/./src/ch01.ts?");

/***/ }),

/***/ "./src/js/utils.ts":
/*!*************************!*\
  !*** ./src/js/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCanvas\": () => (/* binding */ getCanvas),\n/* harmony export */   \"getGLContext\": () => (/* binding */ getGLContext)\n/* harmony export */ });\n/**\n * Find and return a DOM element given an ID\n * html内から、 <canvas id=\"name\"/> の要素を取得して返却します。\n *\n * @param canvasElementId canvasに割り振られたid\n * @returns\n */\nconst getCanvas = (canvasElementId) => {\n    const canvas = document.getElementById(canvasElementId);\n    if (!canvas) {\n        console.error(`${canvasElementId} というidのElementが存在しません。`);\n        return null;\n    }\n    if (!(canvas instanceof HTMLCanvasElement)) {\n        console.error(`このElementはCanvasではありません。 ${canvasElementId}==<${canvas.tagName.toLowerCase()}>`);\n        return null;\n    }\n    return canvas;\n};\nconst getGLContext = (canvas) => canvas.getContext('webgl2');\n/*\n'use strict';\n\n// A set of utility functions for /common operations across our application\nconst utils = {\n\n  // Find and return a DOM element given an ID\n  getCanvas(id) {\n    const canvas = document.getElementById(id);\n\n    if (!canvas) {\n      console.error(`There is no canvas with id ${id} on this page.`);\n      return null;\n    }\n\n    return canvas;\n  },\n\n  // Given a canvas element, return the WebGL2 context\n  getGLContext(canvas) {\n    return canvas.getContext('webgl2') || console.error('WebGL2 is not available in your browser.');\n  },\n\n  // Given a canvas element, expand it to the size of the window\n  // and ensure that it automatically resizes as the window changes\n  autoResizeCanvas(canvas) {\n    const expandFullScreen = () => {\n      canvas.width = window.innerWidth;\n      canvas.height = window.innerHeight;\n    };\n    expandFullScreen();\n    // Resize screen when the browser has triggered the resize event\n    window.addEventListener('resize', expandFullScreen);\n  },\n\n  // Given a WebGL context and an id for a shader script,\n  // return a compiled shader\n  getShader(gl, id) {\n    const script = document.getElementById(id);\n    if (!script) {\n      return null;\n    }\n\n    const shaderString = script.text.trim();\n\n    let shader;\n    if (script.type === 'x-shader/x-vertex') {\n      shader = gl.createShader(gl.VERTEX_SHADER);\n    }\n    else if (script.type === 'x-shader/x-fragment') {\n      shader = gl.createShader(gl.FRAGMENT_SHADER);\n    }\n    else {\n      return null;\n    }\n\n    gl.shaderSource(shader, shaderString);\n    gl.compileShader(shader);\n\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n      console.error(gl.getShaderInfoLog(shader));\n      return null;\n    }\n\n    return shader;\n  },\n\n  // Normalize colors from 0-255 to 0-1\n  normalizeColor(color) {\n    return color.map(c => c / 255);\n  },\n\n  // De-normalize colors from 0-1 to 0-255\n  denormalizeColor(color) {\n    return color.map(c => c * 255);\n  },\n\n  // Returns computed normals for provided vertices.\n  // Note: Indices have to be completely defined--NO TRIANGLE_STRIP only TRIANGLES.\n  calculateNormals(vs, ind) {\n    const\n      x = 0,\n      y = 1,\n      z = 2,\n      ns = [];\n\n    // For each vertex, initialize normal x, normal y, normal z\n    for (let i = 0; i < vs.length; i += 3) {\n      ns[i + x] = 0.0;\n      ns[i + y] = 0.0;\n      ns[i + z] = 0.0;\n    }\n\n    // We work on triads of vertices to calculate\n    for (let i = 0; i < ind.length; i += 3) {\n      // Normals so i = i+3 (i = indices index)\n      const v1 = [], v2 = [], normal = [];\n\n      // p2 - p1\n      v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];\n      v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];\n      v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];\n\n      // p0 - p1\n      v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];\n      v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];\n      v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];\n\n      // Cross product by Sarrus Rule\n      normal[x] = v1[y] * v2[z] - v1[z] * v2[y];\n      normal[y] = v1[z] * v2[x] - v1[x] * v2[z];\n      normal[z] = v1[x] * v2[y] - v1[y] * v2[x];\n\n      // Update the normals of that triangle: sum of vectors\n      for (let j = 0; j < 3; j++) {\n        ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];\n        ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];\n        ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];\n      }\n    }\n\n    // Normalize the result.\n    // The increment here is because each vertex occurs.\n    for (let i = 0; i < vs.length; i += 3) {\n      // With an offset of 3 in the array (due to x, y, z contiguous values)\n      const nn = [];\n      nn[x] = ns[i + x];\n      nn[y] = ns[i + y];\n      nn[z] = ns[i + z];\n\n      let len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));\n      if (len === 0) len = 1.0;\n\n      nn[x] = nn[x] / len;\n      nn[y] = nn[y] / len;\n      nn[z] = nn[z] / len;\n\n      ns[i + x] = nn[x];\n      ns[i + y] = nn[y];\n      ns[i + z] = nn[z];\n    }\n\n    return ns;\n  },\n\n  // A simpler API on top of the dat.GUI API, specifically\n  // designed for this book for a simpler codebase\n  configureControls(settings, options = { width: 300 }) {\n    // Check if a gui instance is passed in or create one by default\n    const gui = options.gui || new dat.GUI(options);\n    const state = {};\n\n    const isAction = v => typeof v === 'function';\n\n    const isFolder = v =>\n      !isAction(v) &&\n      typeof v === 'object' &&\n      (v.value === null || v.value === undefined);\n\n    const isColor = v =>\n      (typeof v === 'string' && ~v.indexOf('#')) ||\n      (Array.isArray(v) && v.length >= 3);\n\n    Object.keys(settings).forEach(key => {\n      const settingValue = settings[key];\n\n      if (isAction(settingValue)) {\n        state[key] = settingValue;\n        return gui.add(state, key);\n      }\n      if (isFolder(settingValue)) {\n        // If it's a folder, recursively call with folder as root settings element\n        return utils.configureControls(settingValue, { gui: gui.addFolder(key) });\n      }\n\n      const {\n        value,\n        min,\n        max,\n        step,\n        options,\n        onChange = () => null,\n      } = settingValue;\n\n      // set state\n      state[key] = value;\n\n      let controller;\n\n      // There are many other values we can set on top of the dat.GUI\n      // API, but we'll only need a few for our purposes\n      if (options) {\n        controller = gui.add(state, key, options);\n      }\n      else if (isColor(value)) {\n        controller = gui.addColor(state, key)\n      }\n      else {\n        controller = gui.add(state, key, min, max, step)\n      }\n\n      controller.onChange(v => onChange(v, state))\n    });\n  },\n\n  // Calculate tangets for a given set of vertices\n  calculateTangents(vs, tc, ind) {\n    const tangents = [];\n\n    for (let i = 0; i < vs.length / 3; i++) {\n      tangents[i] = [0, 0, 0];\n    }\n\n    let\n      a = [0, 0, 0],\n      b = [0, 0, 0],\n      triTangent = [0, 0, 0];\n\n    for (let i = 0; i < ind.length; i += 3) {\n      const i0 = ind[i];\n      const i1 = ind[i + 1];\n      const i2 = ind[i + 2];\n\n      const pos0 = [vs[i0 * 3], vs[i0 * 3 + 1], vs[i0 * 3 + 2]];\n      const pos1 = [vs[i1 * 3], vs[i1 * 3 + 1], vs[i1 * 3 + 2]];\n      const pos2 = [vs[i2 * 3], vs[i2 * 3 + 1], vs[i2 * 3 + 2]];\n\n      const tex0 = [tc[i0 * 2], tc[i0 * 2 + 1]];\n      const tex1 = [tc[i1 * 2], tc[i1 * 2 + 1]];\n      const tex2 = [tc[i2 * 2], tc[i2 * 2 + 1]];\n\n      vec3.subtract(a, pos1, pos0);\n      vec3.subtract(b, pos2, pos0);\n\n      const c2c1b = tex1[1] - tex0[1];\n      const c3c1b = tex2[0] - tex0[1];\n\n      triTangent = [c3c1b * a[0] - c2c1b * b[0], c3c1b * a[1] - c2c1b * b[1], c3c1b * a[2] - c2c1b * b[2]];\n\n      vec3.add(triTangent, tangents[i0], triTangent);\n      vec3.add(triTangent, tangents[i1], triTangent);\n      vec3.add(triTangent, tangents[i2], triTangent);\n    }\n\n    // Normalize tangents\n    const ts = [];\n    tangents.forEach(tan => {\n      vec3.normalize(tan, tan);\n      ts.push(tan[0]);\n      ts.push(tan[1]);\n      ts.push(tan[2]);\n    });\n\n    return ts;\n  }\n\n};\n*/\n\n\n//# sourceURL=webpack://webgl/./src/js/utils.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ch01.ts");
/******/ 	
/******/ })()
;