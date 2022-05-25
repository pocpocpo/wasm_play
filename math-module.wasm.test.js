// evitar ao maximo usar import com jest
// evitar ao maximo modulos es6 ocm jest
// usar modulos es5
const  fs = require('fs')

let mathModule

beforeAll(async () => {
    const mathWasm = fs.readFileSync('./public/math-module.wasm')
    const buffer = new Uint8Array(mathWasm)

    // usar como uma var global
    mathModule =
        await WebAssembly
            .instantiate(new Uint8Array(mathWasm))
            .then(res => res.instance.exports)
})

test('square 5', () => expect(mathModule.square(5)).toBe(25))
test('add 5 to 5', () => expect(mathModule.add(5, 5)).toBe(10))
test('subtract 3 from 5', () => expect(mathModule.sub(5, 3)).toBe(2))

test('fibonacci of 0', () => expect(mathModule.fibonacci(0)).toBe(0))
test('fibonacci of 1', () => expect(mathModule.fibonacci(1)).toBe(1))
test('fibonacci of 19', () => expect(mathModule.fibonacci(19)).toBe(4181))
test('fibonacci of 20', () => expect(mathModule.fibonacci(20)).toBe(6765))
