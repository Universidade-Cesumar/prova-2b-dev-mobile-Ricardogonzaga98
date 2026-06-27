import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Animated,
} from 'react-native';
import { MaterialCard } from './MaterialCard';

export function ListaEstoque({ materiais, loading, erro, onRecarregar, onEditar, onExcluir }) {
  if (loading) {
    return (
      <View style={styles.centrado}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#22D3EE" />
          <Text style={styles.loadingTexto}>Carregando estoque...</Text>
          <View style={styles.loadingBar}>
            <Animated.View style={styles.loadingBarInner} />
          </View>
        </View>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centrado}>
        <View style={styles.erroBox}>
          <Text style={styles.erroIcone}>{'🔌'}</Text>
          <Text style={styles.erroTitulo}>Falha na conexão</Text>
          <Text style={styles.erroMsg}>{erro}</Text>
          <TouchableOpacity style={styles.btnRecarregar} onPress={onRecarregar} activeOpacity={0.7}>
            <Text style={styles.btnRecarregarTexto}>{'🔄'} Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      testID="lista-materiais"
      data={materiais}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => (
        <MaterialCard
          item={item}
          index={index}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      )}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRecarregar}
          tintColor="#22D3EE"
          colors={['#22D3EE']}
        />
      }
      contentContainerStyle={materiais.length === 0 ? styles.listaVazia : styles.lista}
      ListEmptyComponent={
        <View style={styles.centrado}>
          <Text style={styles.iconeVazio}>{'📦'}</Text>
          <Text style={styles.textoVazio}>Nenhum material encontrado</Text>
          <Text style={styles.textoSecundario}>
            Cadastre um novo item usando o formulário acima
          </Text>
        </View>
      }
      ListHeaderComponent={null}
    />
  );
}

const styles = StyleSheet.create({
  lista: { paddingBottom: 32, paddingTop: 4 },
  listaVazia: { flexGrow: 1, justifyContent: 'center' },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  loadingBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    minWidth: 220,
  },
  loadingTexto: { color: '#94A3B8', fontSize: 14, fontWeight: '600', marginTop: 16 },
  loadingBar: {
    width: 120,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginTop: 16,
    overflow: 'hidden',
  },
  loadingBarInner: {
    width: '40%',
    height: '100%',
    backgroundColor: '#22D3EE',
    borderRadius: 2,
  },
  erroBox: {
    backgroundColor: '#1C1117',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F1D1D',
    maxWidth: 320,
  },
  erroIcone: { fontSize: 40, marginBottom: 12 },
  erroTitulo: { color: '#FCA5A5', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  erroMsg: { color: '#94A3B8', fontSize: 13, textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  btnRecarregar: {
    backgroundColor: '#22D3EE',
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  btnRecarregarTexto: { color: '#0F172A', fontWeight: '700', fontSize: 14 },
  iconeVazio: { fontSize: 56, marginBottom: 16 },
  textoVazio: { color: '#94A3B8', fontSize: 17, fontWeight: '700', textAlign: 'center' },
  textoSecundario: { color: '#475569', fontSize: 14, textAlign: 'center', marginTop: 8 },
});
