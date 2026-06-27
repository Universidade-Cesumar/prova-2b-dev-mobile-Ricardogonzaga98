export function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (typeof estoqueAtual !== "number" || typeof quantidadeRetirada !== "number") {
    return false;
  }
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}
