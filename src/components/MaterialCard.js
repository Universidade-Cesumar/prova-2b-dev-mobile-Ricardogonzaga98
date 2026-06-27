import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Animated,
} from 'react-native';
import { LIMITE_ESTOQUE_CRITICO } from '../constants';
import { validarRetirada } from '../utils/validarRetirada';

export function MaterialCard({ item, onEditar, onExcluir, index }) {
  const [editMode, setEditMode] = useState(false);
  const [retiradaMode, setRetiradaMode] = useState(false);
  const [quantidadeRetirada, setQuantidadeRetirada] = useState('');
  const [nome, setNome] = useState(item.nome);
  const [quantidade, setQuantidade] = useState(String(item.quantidade));

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const delay = Math.min((index || 0) * 50, 500);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    setNome(item.nome);
    setQuantidade(String(item.quantidade));
  }, [item.nome, item.quantidade]);

  const estoqueCritico = Number(item.quantidade) < LIMITE_ESTOQUE_CRITICO;

  const alerta = (msg) => {
    Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Atenção', msg);
  };

  const handleSalvar = () => {
    const nomeTrim = nome.trim();
    const quantidadeNumero = Number(quantidade);

    if (!nomeTrim) { alerta('O nome do material não pode ficar em branco.'); return; }
    if (!quantidade || quantidadeNumero <= 0) { alerta('Informe uma quantidade válida maior que zero.'); return; }

    onEditar(item.id, { nome: nomeTrim, quantidade: quantidadeNumero });
    setEditMode(false);
  };

  const handleRetirada = () => {
    const qtd = Number(quantidadeRetirada);
    if (!validarRetirada(Number(item.quantidade), qtd)) {
      alerta('Quantidade de retirada inválida.');
      return;
    }
    onEditar(item.id, { quantidade: Number(item.quantidade) - qtd });
    setQuantidadeRetirada('');
    setRetiradaMode(false);
  };

  const handleExcluir = () => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir "${item.nome}" do estoque?`)) {
        onExcluir(item.id);
      }
    } else {
      Alert.alert('Confirmação', `Deseja excluir "${item.nome}" do estoque?`, [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onExcluir(item.id) },
      ]);
    }
  };

  return (
    <Animated.View
      style={[
        styles.card,
        estoqueCritico && styles.cardCritico,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
      accessibilityLabel={estoqueCritico ? 'estoque-critico' : undefined}
    >
      <View style={styles.info}>
        {editMode ? (
          <>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Nome do material"
              placeholderTextColor="#94A3B8"
              testID={`input-editar-nome-${item.id}`}
            />
            <TextInput
              style={styles.input}
              value={quantidade}
              onChangeText={(v) => setQuantidade(v.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              placeholder="Quantidade"
              placeholderTextColor="#94A3B8"
              testID={`input-editar-quantidade-${item.id}`}
            />
          </>
        ) : (
          <>
            <Text style={styles.nome}>{item.nome}</Text>
            <View style={styles.meta}>
              <Text style={styles.id}>#{item.id}</Text>
              {estoqueCritico && (
                <View style={styles.alertaBadge}>
                  <Text style={styles.alertaTexto}>Estoque crítico</Text>
                </View>
              )}
            </View>
          </>
        )}
      </View>

      {editMode ? (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar} activeOpacity={0.7}>
            <Text style={styles.buttonText}>{'💾'} Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setEditMode(false)} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : retiradaMode ? (
        <View style={styles.retiradaContainer}>
          <TextInput
            testID="input-retirada"
            style={styles.inputRetirada}
            value={quantidadeRetirada}
            onChangeText={(v) => setQuantidadeRetirada(v.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            placeholder="Qtd"
            placeholderTextColor="#94A3B8"
          />
          <TouchableOpacity testID="btn-baixar" style={styles.baixarButton} onPress={handleRetirada} activeOpacity={0.7}>
            <Text style={styles.buttonText}>{'📤'} Baixar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => { setRetiradaMode(false); setQuantidadeRetirada(''); }} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.rightColumn}>
          <View style={[styles.badge, estoqueCritico && styles.badgeAlerta]}>
            <Text style={[styles.badgeTexto, estoqueCritico && styles.badgeTextoCritico]}>{item.quantidade}</Text>
            <Text style={styles.badgeLabel}>un.</Text>
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.retirarButton} onPress={() => setRetiradaMode(true)} testID="btn-retirar" activeOpacity={0.7}>
              <Text style={styles.buttonText}>{'📤'} Retirar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setEditMode(true)} testID="btn-editar" activeOpacity={0.7}>
              <Text style={styles.buttonText}>{'✏️'} Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleExcluir} testID="btn-excluir" activeOpacity={0.7}>
              <Text style={styles.deleteBtnText}>{'🗑️'} Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#22D3EE',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cardCritico: {
    backgroundColor: '#2A1215',
    borderLeftColor: '#EF4444',
  },
  info: { flex: 1 },
  nome: { color: '#F1F5F9', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  id: { color: '#64748B', fontSize: 12 },
  alertaBadge: {
    backgroundColor: '#7F1D1D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  alertaTexto: { color: '#FCA5A5', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
    minWidth: 160,
  },
  badge: {
    backgroundColor: '#0F172A',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeAlerta: { backgroundColor: '#450A0A', borderColor: '#EF4444' },
  badgeTexto: { color: '#22D3EE', fontSize: 22, fontWeight: '800', lineHeight: 26 },
  badgeTextoCritico: { color: '#EF4444' },
  badgeLabel: { color: '#64748B', fontSize: 10, marginTop: 1 },
  rightColumn: { alignItems: 'flex-end' },
  actionsContainer: { marginTop: 10, flexDirection: 'row', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' },
  button: {
    backgroundColor: '#22D3EE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButton: { backgroundColor: '#DC2626' },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: '#0F172A', fontWeight: '700', fontSize: 13 },
  deleteBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 13 },
  cancelText: { color: '#F8FAFC', fontWeight: '600', fontSize: 13 },
  retiradaContainer: { alignItems: 'flex-end', gap: 6 },
  inputRetirada: {
    backgroundColor: '#0F172A',
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 8,
    minWidth: 70,
    textAlign: 'center',
  },
  baixarButton: { backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  retirarButton: { backgroundColor: '#F59E0B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
});
