import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LIMITE_ESTOQUE_CRITICO } from '../constants';

export function DashboardStats({ materiais }) {
  const total = materiais.length;
  const criticos = materiais.filter((m) => Number(m.quantidade) < LIMITE_ESTOQUE_CRITICO).length;
  const totalUnidades = materiais.reduce((acc, m) => acc + Number(m.quantidade), 0);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icone}>{'📦'}</Text>
        <Text style={styles.valor}>{total}</Text>
        <Text style={styles.label}>Itens</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.icone}>{'📊'}</Text>
        <Text style={styles.valor}>{totalUnidades.toLocaleString()}</Text>
        <Text style={styles.label}>Unidades</Text>
      </View>
      <View style={[styles.card, criticos > 0 && styles.cardCritico]}>
        <Text style={styles.icone}>{'⚠️'}</Text>
        <Text style={[styles.valor, criticos > 0 && styles.valorCritico]}>{criticos}</Text>
        <Text style={styles.label}>Críticos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardCritico: {
    borderColor: '#EF4444',
    backgroundColor: '#1C1117',
  },
  icone: {
    fontSize: 20,
    marginBottom: 4,
  },
  valor: {
    color: '#F1F5F9',
    fontSize: 22,
    fontWeight: '800',
  },
  valorCritico: {
    color: '#EF4444',
  },
  label: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
