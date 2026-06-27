import { useState, useEffect, useCallback } from 'react';
import { getMateriais, putMaterial, deleteMaterial } from '../services/api';

/**
 * Hook personalizado para buscar e gerenciar a lista de materiais do estoque.
 * Encapsula a chamada GET à MockAPI e os estados de loading/erro.
 */
export function useMateriais() {
  const [materiais, setMateriais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const buscarMateriais = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const dados = await getMateriais();
      setMateriais(dados);
    } catch (e) {
      setErro(e.message || 'Erro ao carregar materiais.');
    } finally {
      setLoading(false);
    }
  }, []);

  const editarMaterial = useCallback(async (id, dados) => {
    try {
      const atualizado = await putMaterial(id, dados);
      setMateriais((prev) =>
        prev.map((item) => (item.id === id ? atualizado : item))
      );
    } catch (e) {
      setErro(e.message || 'Erro ao atualizar material.');
    }
  }, []);

  const deletarMaterial = useCallback(async (id) => {
    try {
      await deleteMaterial(id);
      setMateriais((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      setErro(e.message || 'Erro ao excluir material.');
    }
  }, []);

  // Carrega os materiais automaticamente ao montar o componente
  useEffect(() => {
    buscarMateriais();
  }, [buscarMateriais]);

  return {
    materiais,
    loading,
    erro,
    recarregar: buscarMateriais,
    editarMaterial,
    deletarMaterial,
  };
}
