import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LIMITE_ESTOQUE_CRITICO } from '../constants';

export function Legenda() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={[styles.dot, styles.dotNormal]} />
        <Text style={styles.texto}>Estoque normal</Text>
      </View>
      <View style={styles.separador} />
      <View style={styles.item}>
        <View style={[styles.dot, styles.dotCritico]} />
        <Text style={styles.texto}>
          Estoque crítico ({'<'} {LIMITE_ESTOQUE_CRITICO} un.)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
    backgroundColor: '#111827',
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1F2937',
  },
  item: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  dotNormal: { backgroundColor: '#22D3EE' },
  dotCritico: { backgroundColor: '#EF4444' },
  texto: { color: '#64748B', fontSize: 11, fontWeight: '600' },
  separador: { width: 1, height: 14, backgroundColor: '#334155' },
});
