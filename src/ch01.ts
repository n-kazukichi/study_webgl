// GLの厳密モード
'use strict'

let gl:WebGL2RenderingContext

const setErrorMessage = (msg: string) => {
  console.error(msg)
  const error = document.getElementById('error')
  if (!error) {
    return
  }
  error.innerText = msg
}
const CANVAS_ELM_NAME = 'webgl-canvas'

// 写経のために...で書いたが 引数はちゃんと定義したほうが好み
// const updateClearColor = (...col: [number, number, number, number]) => {
//   gl.clearColor(...col)
const updateClearColor = (r: number, g: number, b: number, a: number) => {
  gl.clearColor(r, g, b, a)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.viewport(0, 0, 0, 0)
}

const checkKey = (ev:KeyboardEvent):void => {
  // 文字コードは非推奨になったらしい。
  // ev.code: 'Digit1' や 'LeftAlt' 'KeyA' など
  // Altなど複数ある同じキーでも、左右どちら？がわかる。
  
  // ev.key: '1' や 'Alt' 'a' など
  // Caps状態やShiftを押している場合
  // アルファベットが大小どちらで入力された？もわかる。
  // console.log('ev', ev.code, ev.key)

  switch(ev.code) {
    case 'Digit1': { // red
      updateClearColor(1, 0, 0, 1)
      break
    }
    case 'Digit2': { // green
      updateClearColor(0, 1, 0, 1)
      break
    }
    case 'Digit3': { // blue
      updateClearColor(0, 0, 1, 1)
      break
    }
    case 'Digit4': { // rand
      updateClearColor(Math.random(), Math.random(), Math.random(), 1)
      break
    }
    case 'KeyA': { // rand
      const color = gl.getParameter(gl.COLOR_CLEAR_VALUE) as Float32Array
      
      console.log(
        `r=${color[0].toFixed(1)},g=${color[1].toFixed(1)},b=${color[2].toFixed(1)}`
      )
      break
    }
  }
}

/**
 * 初期化
 */
const init = ():void => {
  const canvas = document.getElementById(CANVAS_ELM_NAME)
  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    // 要素無かった || canvas タグじゃなかった の場合エラー。
    setErrorMessage('Canvas要素無いですよ')
    return
  }

  const context = canvas.getContext('webgl2')
  if (!context) {
    setErrorMessage('WebGL2.0使えるブラウザではない。')
    return
  }
  gl = context

  window.onkeydown = checkKey
}
window.onload = init
