import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { CadastroForm } from '../components/CadastroForm';
import { ListaEstoque } from '../components/ListaEstoque';
import { Legenda } from '../components/Legenda';
import { DashboardStats } from '../components/DashboardStats';
import { Toast } from '../components/Toast';
import { useMateriais } from '../hooks/useMateriais';

export function HomeScreen() {
  const {
    materiais,
    loading,
    erro,
    recarregar,
    editarMaterial,
    deletarMaterial,
  } = useMateriais();

  const [busca, setBusca] = useState('');
  const [toast, setToast] = useState({ visivel: false, tipo: 'sucesso', mensagem: '' });

  const mostrarToast = useCallback((tipo, mensagem) => {
    setToast({ visivel: true, tipo, mensagem });
  }, []);

  const fecharToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visivel: false }));
  }, []);

  const materiaisFiltrados = useMemo(() => {
    if (!busca.trim()) return materiais;
    const termo = busca.toLowerCase().trim();
    return materiais.filter((m) => m.nome.toLowerCase().includes(termo));
  }, [materiais, busca]);

  const handleEditar = useCallback(async (id, dados) => {
    await editarMaterial(id, dados);
    mostrarToast('sucesso', 'Material atualizado com sucesso!');
  }, [editarMaterial, mostrarToast]);

  const handleExcluir = useCallback(async (id) => {
    await deletarMaterial(id);
    mostrarToast('sucesso', 'Material excluído do estoque.');
  }, [deletarMaterial, mostrarToast]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <Toast
        visivel={toast.visivel}
        tipo={toast.tipo}
        mensagem={toast.mensagem}
        onFechar={fecharToast}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <View style={styles.header}>
          <View style={styles.headerIconeBox}>
            <Text style={styles.headerIcone}>{'🏭'}</Text>
          </View>
          <View>
            <Text style={styles.headerTitulo}>Almoxarifado</Text>
            <Text style={styles.headerSubtitulo}>Sistema de Controle de Estoque</Text>
          </View>
        </View>

        <DashboardStats materiais={materiais} />

        <CadastroForm onCadastroSucesso={recarregar} onToast={mostrarToast} />

        <View style={styles.secaoBusca}>
          <View style={styles.buscaWrapper}>
            <Text style={styles.buscaIcone}>{'🔍'}</Text>
            <TextInput
              testID="input-busca"
              accessibilityLabel="Pesquisar material"
              style={styles.inputBusca}
              placeholder="Pesquisar material..."
              placeholderTextColor="#475569"
              value={busca}
              onChangeText={setBusca}
              autoCorrect={false}
            />
            {busca.length > 0 && (
              <Text style={styles.limparBusca} onPress={() => setBusca('')}>{'✕'}</Text>
            )}
          </View>
          <Text testID="total-itens" style={styles.totalItens}>
            {materiaisFiltrados.length} {materiaisFiltrados.length === 1 ? 'item' : 'itens'}
          </Text>
        </View>

        <Legenda />

        <View style={styles.espacador} />

        <ListaEstoque
          materiais={materiaisFiltrados}
          loading={loading}
          erro={erro}
          onRecarregar={recarregar}
          onEditar={handleEditar}
          onExcluir={handleExcluir}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0F172A' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 14,
  },
  headerIconeBox: {
    backgroundColor: '#1E293B',
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerIcone: { fontSize: 26 },
  headerTitulo: {
    color: '#F1F5F9',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitulo: { color: '#64748B', fontSize: 12, fontWeight: '500' },
  secaoBusca: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  buscaWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
  },
  buscaIcone: { fontSize: 16, marginRight: 8 },
  inputBusca: {
    flex: 1,
    color: '#F1F5F9',
    fontSize: 15,
    paddingVertical: 12,
  },
  limparBusca: {
    color: '#64748B',
    fontSize: 16,
    padding: 4,
    fontWeight: '700',
  },
  totalItens: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'right',
  },
  espacador: { height: 6 },
});
