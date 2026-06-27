import { API_BASE_URL, ENDPOINT_MATERIAIS } from '../constants';

async function fetchSeguro(url, opcoes) {
  try {
    const response = await fetch(url, opcoes);
    if (!response.ok) {
      throw new Error(`Erro do servidor: ${response.status}`);
    }
    return response;
  } catch (erro) {
    if (erro.message.includes('Network request failed') || erro.message.includes('Failed to fetch')) {
      throw new Error('Sem conexão com a internet. Verifique sua rede e tente novamente.');
    }
    throw erro;
  }
}

function mapearMaterial(item) {
  return {
    id: item.campo1 || item.id,
    nome: item.nome,
    quantidade: Number(item.quantidade),
  };
}

export async function getMateriais() {
  try {
    const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`);
    const dados = await response.json();
    return dados.map(mapearMaterial);
  } catch (erro) {
    if (erro.message.includes('404')) return [];
    throw erro;
  }
}

export async function postMaterial(material) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(material),
  });
  const dados = await response.json();
  return mapearMaterial(dados);
}

export async function putMaterial(id, dados) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const resultado = await response.json();
  return mapearMaterial(resultado);
}

export async function deleteMaterial(id) {
  const response = await fetchSeguro(`${API_BASE_URL}${ENDPOINT_MATERIAIS}/${id}`, {
    method: 'DELETE',
  });
  try {
    await response.json();
  } catch (_) {
    // MockAPI pode retornar sem corpo em DELETE.
  }
}
