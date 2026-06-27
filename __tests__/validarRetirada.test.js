import { validarRetirada } from '../src/utils/validarRetirada';

test('retira exatamente o estoque disponível', () => expect(validarRetirada(10, 10)).toBe(true));
test('retira menos do que o disponível', () => expect(validarRetirada(10, 5)).toBe(true));
test('tenta retirar mais do que o disponível', () => expect(validarRetirada(5, 10)).toBe(false));
test('tenta retirar de estoque zerado', () => expect(validarRetirada(0, 1)).toBe(false));
test('quantidade zero é inválida', () => expect(validarRetirada(10, 0)).toBe(false));
test('quantidade negativa é inválida', () => expect(validarRetirada(10, -3)).toBe(false));
test('string como quantidade é inválida', () => expect(validarRetirada(10, '5')).toBe(false));
test('null é inválido', () => expect(validarRetirada(10, null)).toBe(false));