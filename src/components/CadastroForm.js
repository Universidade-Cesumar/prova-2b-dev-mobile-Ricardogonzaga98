import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { postMaterial } from '../services/api';

export function CadastroForm({ onCadastroSucesso, onToast }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [aberto, setAberto] = useState(false);

  const limparFormulario = () => { setNome(''); setQuantidade(''); };

  const handleCadastrar = async () => {
    if (!nome.trim()) {
      onToast && onToast('erro', 'Informe o nome do material.');
      return;
    }
    if (!quantidade || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      onToast && onToast('erro', 'Informe uma quantidade válida.');
      return;
    }

    setSalvando(true);
    try {
      await postMaterial({ nome: nome.trim(), quantidade: Number(quantidade) });
      limparFormulario();
      onCadastroSucesso();
      onToast && onToast('sucesso', `"${nome.trim()}" cadastrado com sucesso!`);
    } catch (e) {
      onToast && onToast('erro', e.message || 'Não foi possível cadastrar.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.headerBtn} onPress={() => setAberto(!aberto)} activeOpacity={0.8}>
        <Text style={styles.titulo}>{'📋'} Novo Material</Text>
        <Text style={styles.chevron}>{aberto ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {aberto && (
        <View style={styles.formBody}>
          <Text style={styles.label}>{'📝'} Nome do Material</Text>
          <TextInput
            testID="input-nome"
            accessibilityLabel="Nome do material"
            style={styles.input}
            placeholder="Ex: Papel A4, Caneta azul..."
            placeholderTextColor="#475569"
            value={nome}
            onChangeText={setNome}
            autoCorrect={false}
          />

          <Text style={styles.label}>{'🔢'} Quantidade</Text>
          <TextInput
            testID="input-quantidade"
            accessibilityLabel="Quantidade em estoque"
            style={styles.input}
            placeholder="Ex: 100"
            placeholderTextColor="#475569"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
            returnKeyType="done"
          />

          <TouchableOpacity
            testID="btn-cadastrar"
            accessibilityLabel="Cadastrar material"
            style={[styles.botao, salvando && styles.botaoDesativado]}
            onPress={handleCadastrar}
            disabled={salvando}
            activeOpacity={0.8}
          >
            {salvando ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.botaoTexto}>{'➕'} Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    margin: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  headerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  chevron: { color: '#64748B', fontSize: 12 },
  formBody: { paddingHorizontal: 16, paddingBottom: 16 },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    color: '#F1F5F9',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  botao: {
    backgroundColor: '#22D3EE',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoDesativado: { opacity: 0.6 },
  botaoTexto: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
