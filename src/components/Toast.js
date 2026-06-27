import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CORES = {
  sucesso: { bg: '#064E3B', borda: '#10B981', icone: '✅' },
  erro: { bg: '#7F1D1D', borda: '#EF4444', icone: '❌' },
  aviso: { bg: '#78350F', borda: '#F59E0B', icone: '⚠️' },
};

export function Toast({ visivel, tipo = 'sucesso', mensagem, onFechar }) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visivel) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -100, duration: 300, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(() => onFechar && onFechar());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visivel]);

  if (!visivel) return null;

  const cor = CORES[tipo] || CORES.sucesso;

  return (
    <Animated.View style={[styles.container, { backgroundColor: cor.bg, borderColor: cor.borda, transform: [{ translateY }], opacity }]}>
      <Text style={styles.icone}>{cor.icone}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  icone: {
    fontSize: 18,
  },
  mensagem: {
    color: '#F1F5F9',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
});
