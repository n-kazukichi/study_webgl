import { utils } from './js/utils'

// 写経元では<script>タグ内の記述を読み込んでシェーダを作成している。
// あくまでこれはシェーダ言語であってJSではない。
// 従ってTSで記述は不可。シェーダ言語部は文字列として記述します。
// 今はとりあえずTS内に記述するが、ゆくゆくはシェーダごと別ファイルに。

const vertexShaderScript = `
#version 300 es
precision mediump float;

// Supplied vertex position attribute
in vec3 aVertexPosition;

void main(void) {
  // Set the position in clipspace coordinates
  gl_Position = vec4(aVertexPosition, 1.0);
}
`
const fragmentShaderScript = `
#version 300 es
precision mediump float;

// Color that is the result of this shader
out vec4 fragColor;

void main(void) {
  // Set the result as red
  fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`

// Global variables that are set and used
// across the application
let gl: WebGL2RenderingContext
let program: WebGLProgram
let squareVertexBuffer: WebGLBuffer
let squareIndexBuffer: WebGLBuffer
let indices

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
const getShader = (type: 'VERTEX' | 'FRAGMENT', script: string) => {
  //  const script = document.getElementById(id)
  const shaderString = script.trim()

  // Assign shader depending on the type of shader
  let shader: WebGLShader
  if (type === 'VERTEX') {
    shader = gl.createShader(gl.VERTEX_SHADER)
  } else if (type === 'FRAGMENT') {
    shader = gl.createShader(gl.FRAGMENT_SHADER)
  } else {
    return null
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString)
  gl.compileShader(shader)

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    return null
  }

  return shader
}

let aVertexPosition: GLint = 0

// Create a program with the appropriate vertex and fragment shaders
const initProgram = () => {
  const vertexShader = getShader('VERTEX', vertexShaderScript)
  const fragmentShader = getShader('FRAGMENT', fragmentShaderScript)

  // Create a program
  program = gl.createProgram()
  // Attach the shaders to this program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders')
  }

  // Use this program instance
  gl.useProgram(program)
  // We attach the location of these shader values to the program instance
  // for easy access later in the code

  // 写経元のように、安易にパラメタを自分勝手に追加しない。
  // program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
  aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
}

// Set up the buffers for the square
const initBuffers = () => {
  /*
        V0                    V3
        (-0.5, 0.5, 0)        (0.5, 0.5, 0)
        X---------------------X
        |                     |
        |                     |
        |       (0, 0)        |
        |                     |
        |                     |
        X---------------------X
        V1                    V2
        (-0.5, -0.5, 0)       (0.5, -0.5, 0)
      */
  const vertices = [-0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0]

  // Indices defined in counter-clockwise order
  indices = [0, 1, 2, 0, 2, 3]

  // Setting up the VBO
  squareVertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

  // Setting up the IBO
  squareIndexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer)
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  )

  // Clean
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}

// We call draw to render to our canvas
const draw = () => {
  // Clear the scene
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  // Use the buffers we've constructed
  gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer)
  gl.vertexAttribPointer(aVertexPosition, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(aVertexPosition)

  // Bind IBO
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer)

  // Draw to the scene using triangle primitives
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0)

  // Clean
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
}

// Entry point to our application
const init = () => {
  // Retrieve the canvas
  const canvas = utils.getCanvas('webgl-canvas')

  // Set the canvas to the size of the screen
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Retrieve a WebGL context
  gl = utils.getGLContext(canvas)
  // Set the clear color to be black
  gl.clearColor(0, 0, 0, 1)

  // Call the functions in an appropriate order
  initProgram()
  initBuffers()
  draw()
}

// Call init once the webpage has loaded
window.onload = init
