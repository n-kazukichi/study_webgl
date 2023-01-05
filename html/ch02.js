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

/***/ "./src/ch02.ts":
/*!*********************!*\
  !*** ./src/ch02.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/utils */ \"./src/js/utils.ts\");\n\n// 写経元では<script>タグ内の記述を読み込んでシェーダを作成している。\n// あくまでこれはシェーダ言語であってJSではない。\n// 従ってTSで記述は不可。シェーダ言語部は文字列として記述します。\n// 今はとりあえずTS内に記述するが、ゆくゆくはシェーダごと別ファイルに。\nconst vertexShaderScript = `\n#version 300 es\nprecision mediump float;\n\n// Supplied vertex position attribute\nin vec3 aVertexPosition;\n\nvoid main(void) {\n  // Set the position in clipspace coordinates\n  gl_Position = vec4(aVertexPosition, 1.0);\n}\n`;\nconst fragmentShaderScript = `\n#version 300 es\nprecision mediump float;\n\n// Color that is the result of this shader\nout vec4 fragColor;\n\nvoid main(void) {\n  // Set the result as red\n  fragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n`;\n// Global variables that are set and used\n// across the application\nlet gl;\nlet program;\nlet squareVertexBuffer;\nlet squareIndexBuffer;\nlet indices;\n// Given an id, extract the content's of a shader script\n// from the DOM and return the compiled shader\nconst getShader = (type, script) => {\n    //  const script = document.getElementById(id)\n    const shaderString = script.trim();\n    // Assign shader depending on the type of shader\n    let shader;\n    if (type === 'VERTEX') {\n        shader = gl.createShader(gl.VERTEX_SHADER);\n    }\n    else if (type === 'FRAGMENT') {\n        shader = gl.createShader(gl.FRAGMENT_SHADER);\n    }\n    else {\n        return null;\n    }\n    // Compile the shader using the supplied shader code\n    gl.shaderSource(shader, shaderString);\n    gl.compileShader(shader);\n    // Ensure the shader is valid\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n        console.error(gl.getShaderInfoLog(shader));\n        return null;\n    }\n    return shader;\n};\nlet aVertexPosition = 0;\n// Create a program with the appropriate vertex and fragment shaders\nconst initProgram = () => {\n    const vertexShader = getShader('VERTEX', vertexShaderScript);\n    const fragmentShader = getShader('FRAGMENT', fragmentShaderScript);\n    // Create a program\n    program = gl.createProgram();\n    // Attach the shaders to this program\n    gl.attachShader(program, vertexShader);\n    gl.attachShader(program, fragmentShader);\n    gl.linkProgram(program);\n    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {\n        console.error('Could not initialize shaders');\n    }\n    // Use this program instance\n    gl.useProgram(program);\n    // We attach the location of these shader values to the program instance\n    // for easy access later in the code\n    // 写経元のように、安易にパラメタを自分勝手に追加しない。\n    // program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')\n    aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');\n};\n// Set up the buffers for the square\nconst initBuffers = () => {\n    /*\n          V0                    V3\n          (-0.5, 0.5, 0)        (0.5, 0.5, 0)\n          X---------------------X\n          |                     |\n          |                     |\n          |       (0, 0)        |\n          |                     |\n          |                     |\n          X---------------------X\n          V1                    V2\n          (-0.5, -0.5, 0)       (0.5, -0.5, 0)\n        */\n    const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0];\n    // Indices defined in counter-clockwise order\n    indices = [0, 1, 2, 0, 2, 3];\n    // Setting up the VBO\n    squareVertexBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n    // Setting up the IBO\n    squareIndexBuffer = gl.createBuffer();\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\n    // Clean\n    gl.bindBuffer(gl.ARRAY_BUFFER, null);\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);\n};\n// We call draw to render to our canvas\nconst draw = () => {\n    // Clear the scene\n    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);\n    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);\n    // Use the buffers we've constructed\n    gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);\n    gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0);\n    gl.enableVertexAttribArray(aVertexPosition);\n    // Bind IBO\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);\n    // Draw to the scene using triangle primitives\n    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);\n    // Clean\n    gl.bindBuffer(gl.ARRAY_BUFFER, null);\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);\n};\n// Entry point to our application\nconst init = () => {\n    // Retrieve the canvas\n    const canvas = _js_utils__WEBPACK_IMPORTED_MODULE_0__.utils.getCanvas('webgl-canvas');\n    // Set the canvas to the size of the screen\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n    // Retrieve a WebGL context\n    gl = _js_utils__WEBPACK_IMPORTED_MODULE_0__.utils.getGLContext(canvas);\n    // Set the clear color to be black\n    gl.clearColor(0, 0, 0, 1);\n    // Call the functions in an appropriate order\n    initProgram();\n    initBuffers();\n    draw();\n};\n// Call init once the webpage has loaded\nwindow.onload = init;\n\n\n//# sourceURL=webpack://webgl/./src/ch02.ts?");

/***/ }),

/***/ "./src/js/utils.ts":
/*!*************************!*\
  !*** ./src/js/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCanvas\": () => (/* binding */ getCanvas),\n/* harmony export */   \"getGLContext\": () => (/* binding */ getGLContext),\n/* harmony export */   \"utils\": () => (/* binding */ utils)\n/* harmony export */ });\n/* eslint-disable no-console */\n/**\n * Find and return a DOM element given an ID\n * html内から、 <canvas id=\"name\"/> の要素を取得して返却します。\n *\n * @param canvasElementId canvasに割り振られたid\n * @returns HTMLCanvasElement 取得できなかった場合null\n */\nconst getCanvas = (canvasElementId) => {\n    const canvas = document.getElementById(canvasElementId);\n    if (!canvas) {\n        console.error(`${canvasElementId} というidのElementが存在しません。`);\n        return null;\n    }\n    if (!(canvas instanceof HTMLCanvasElement)) {\n        console.error(`このElementはCanvasではありません。 ${canvasElementId}==<${canvas.tagName.toLowerCase()}>`);\n        return null;\n    }\n    return canvas;\n};\n/**\n * Given a canvas element, return the WebGL2 context\n * @param canvas canvas要素\n * @returns WebGL2のcontext ブラウザが対応していないなど\n * 取得できなかった場合null\n */\nconst getGLContext = (canvas) => canvas.getContext('webgl2');\n/**\n * Utilの再定義。\n * バンドルサイズ的には↑のように１メソッドごとexportして必要なものだけ\n * 使えばいいが、写経にあたり書き味が悪くなるため\n * utils.xxx()の形で呼び出したいためclass使う。\n *\n */\nclass utils {\n}\n// eslint-disable-next-line class-methods-use-this\n/**\n * Find and return a DOM element given an ID\n * html内から、 <canvas id=\"name\"/> の要素を取得して返却します。\n *\n * @param canvasElementId canvasに割り振られたid\n * @returns HTMLCanvasElement 取得できなかった場合null\n */\nutils.getCanvas = (canvasElementId) => {\n    const canvas = document.getElementById(canvasElementId);\n    if (!canvas) {\n        console.error(`${canvasElementId} というidのElementが存在しません。`);\n        return null;\n    }\n    if (!(canvas instanceof HTMLCanvasElement)) {\n        console.error(`このElementはCanvasではありません。 ${canvasElementId}==<${canvas.tagName.toLowerCase()}>`);\n        return null;\n    }\n    return canvas;\n};\n/**\n * Given a canvas element, return the WebGL2 context\n * @param canvas canvas要素\n * @returns WebGL2のcontext ブラウザが対応していないなど\n * 取得できなかった場合null\n */\nutils.getGLContext = (canvas) => canvas.getContext('webgl2');\n/*\n'use strict';\n\n  // Given a canvas element, expand it to the size of the window\n  // and ensure that it automatically resizes as the window changes\n  autoResizeCanvas(canvas) {\n    const expandFullScreen = () => {\n      canvas.width = window.innerWidth;\n      canvas.height = window.innerHeight;\n    };\n    expandFullScreen();\n    // Resize screen when the browser has triggered the resize event\n    window.addEventListener('resize', expandFullScreen);\n  },\n\n  // Given a WebGL context and an id for a shader script,\n  // return a compiled shader\n  getShader(gl, id) {\n    const script = document.getElementById(id);\n    if (!script) {\n      return null;\n    }\n\n    const shaderString = script.text.trim();\n\n    let shader;\n    if (script.type === 'x-shader/x-vertex') {\n      shader = gl.createShader(gl.VERTEX_SHADER);\n    }\n    else if (script.type === 'x-shader/x-fragment') {\n      shader = gl.createShader(gl.FRAGMENT_SHADER);\n    }\n    else {\n      return null;\n    }\n\n    gl.shaderSource(shader, shaderString);\n    gl.compileShader(shader);\n\n    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n      console.error(gl.getShaderInfoLog(shader));\n      return null;\n    }\n\n    return shader;\n  },\n\n  // Normalize colors from 0-255 to 0-1\n  normalizeColor(color) {\n    return color.map(c => c / 255);\n  },\n\n  // De-normalize colors from 0-1 to 0-255\n  denormalizeColor(color) {\n    return color.map(c => c * 255);\n  },\n\n  // Returns computed normals for provided vertices.\n  // Note: Indices have to be completely defined--NO TRIANGLE_STRIP only TRIANGLES.\n  calculateNormals(vs, ind) {\n    const\n      x = 0,\n      y = 1,\n      z = 2,\n      ns = [];\n\n    // For each vertex, initialize normal x, normal y, normal z\n    for (let i = 0; i < vs.length; i += 3) {\n      ns[i + x] = 0.0;\n      ns[i + y] = 0.0;\n      ns[i + z] = 0.0;\n    }\n\n    // We work on triads of vertices to calculate\n    for (let i = 0; i < ind.length; i += 3) {\n      // Normals so i = i+3 (i = indices index)\n      const v1 = [], v2 = [], normal = [];\n\n      // p2 - p1\n      v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];\n      v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];\n      v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];\n\n      // p0 - p1\n      v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];\n      v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];\n      v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];\n\n      // Cross product by Sarrus Rule\n      normal[x] = v1[y] * v2[z] - v1[z] * v2[y];\n      normal[y] = v1[z] * v2[x] - v1[x] * v2[z];\n      normal[z] = v1[x] * v2[y] - v1[y] * v2[x];\n\n      // Update the normals of that triangle: sum of vectors\n      for (let j = 0; j < 3; j++) {\n        ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];\n        ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];\n        ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];\n      }\n    }\n\n    // Normalize the result.\n    // The increment here is because each vertex occurs.\n    for (let i = 0; i < vs.length; i += 3) {\n      // With an offset of 3 in the array (due to x, y, z contiguous values)\n      const nn = [];\n      nn[x] = ns[i + x];\n      nn[y] = ns[i + y];\n      nn[z] = ns[i + z];\n\n      let len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));\n      if (len === 0) len = 1.0;\n\n      nn[x] = nn[x] / len;\n      nn[y] = nn[y] / len;\n      nn[z] = nn[z] / len;\n\n      ns[i + x] = nn[x];\n      ns[i + y] = nn[y];\n      ns[i + z] = nn[z];\n    }\n\n    return ns;\n  },\n\n  // A simpler API on top of the dat.GUI API, specifically\n  // designed for this book for a simpler codebase\n  configureControls(settings, options = { width: 300 }) {\n    // Check if a gui instance is passed in or create one by default\n    const gui = options.gui || new dat.GUI(options);\n    const state = {};\n\n    const isAction = v => typeof v === 'function';\n\n    const isFolder = v =>\n      !isAction(v) &&\n      typeof v === 'object' &&\n      (v.value === null || v.value === undefined);\n\n    const isColor = v =>\n      (typeof v === 'string' && ~v.indexOf('#')) ||\n      (Array.isArray(v) && v.length >= 3);\n\n    Object.keys(settings).forEach(key => {\n      const settingValue = settings[key];\n\n      if (isAction(settingValue)) {\n        state[key] = settingValue;\n        return gui.add(state, key);\n      }\n      if (isFolder(settingValue)) {\n        // If it's a folder, recursively call with folder as root settings element\n        return utils.configureControls(settingValue, { gui: gui.addFolder(key) });\n      }\n\n      const {\n        value,\n        min,\n        max,\n        step,\n        options,\n        onChange = () => null,\n      } = settingValue;\n\n      // set state\n      state[key] = value;\n\n      let controller;\n\n      // There are many other values we can set on top of the dat.GUI\n      // API, but we'll only need a few for our purposes\n      if (options) {\n        controller = gui.add(state, key, options);\n      }\n      else if (isColor(value)) {\n        controller = gui.addColor(state, key)\n      }\n      else {\n        controller = gui.add(state, key, min, max, step)\n      }\n\n      controller.onChange(v => onChange(v, state))\n    });\n  },\n\n  // Calculate tangets for a given set of vertices\n  calculateTangents(vs, tc, ind) {\n    const tangents = [];\n\n    for (let i = 0; i < vs.length / 3; i++) {\n      tangents[i] = [0, 0, 0];\n    }\n\n    let\n      a = [0, 0, 0],\n      b = [0, 0, 0],\n      triTangent = [0, 0, 0];\n\n    for (let i = 0; i < ind.length; i += 3) {\n      const i0 = ind[i];\n      const i1 = ind[i + 1];\n      const i2 = ind[i + 2];\n\n      const pos0 = [vs[i0 * 3], vs[i0 * 3 + 1], vs[i0 * 3 + 2]];\n      const pos1 = [vs[i1 * 3], vs[i1 * 3 + 1], vs[i1 * 3 + 2]];\n      const pos2 = [vs[i2 * 3], vs[i2 * 3 + 1], vs[i2 * 3 + 2]];\n\n      const tex0 = [tc[i0 * 2], tc[i0 * 2 + 1]];\n      const tex1 = [tc[i1 * 2], tc[i1 * 2 + 1]];\n      const tex2 = [tc[i2 * 2], tc[i2 * 2 + 1]];\n\n      vec3.subtract(a, pos1, pos0);\n      vec3.subtract(b, pos2, pos0);\n\n      const c2c1b = tex1[1] - tex0[1];\n      const c3c1b = tex2[0] - tex0[1];\n\n      triTangent = [c3c1b * a[0] - c2c1b * b[0], c3c1b * a[1] - c2c1b * b[1], c3c1b * a[2] - c2c1b * b[2]];\n\n      vec3.add(triTangent, tangents[i0], triTangent);\n      vec3.add(triTangent, tangents[i1], triTangent);\n      vec3.add(triTangent, tangents[i2], triTangent);\n    }\n\n    // Normalize tangents\n    const ts = [];\n    tangents.forEach(tan => {\n      vec3.normalize(tan, tan);\n      ts.push(tan[0]);\n      ts.push(tan[1]);\n      ts.push(tan[2]);\n    });\n\n    return ts;\n  }\n\n};\n*/\n\n\n//# sourceURL=webpack://webgl/./src/js/utils.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ch02.ts");
/******/ 	
/******/ })()
;