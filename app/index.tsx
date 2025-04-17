import React, { useState, useEffect, useLayoutEffect  } from 'react';
import { useRouter, useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';

export default function HomeScreen() {
  const botoes = [
    { label: 'Cadastro de escalas', rota: '/cadastro-escalas', icon: 'calendar-today' },
    { label: 'Consulta de escalas', rota: '/consulta-escalas', icon: 'remove-red-eye' },
    { label: 'Gestão de departamentos', rota: '/gestao-departamentos', icon: 'apartment' },
    { label: 'Restrições', rota: '/restricoes', icon: 'calendar-remove' },
    { label: 'Indicadores', rota: '/indicadores', icon: 'bar-chart' },
  ]

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Inicio', // título do header
    });
  }, [navigation]);

  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TOPO COM ÍCONES */}
      <View style={styles.topIcons}>
        <Ionicons name="person-outline" size={24} color="#001F54" />
        <Ionicons name="log-out-outline" size={24} color="#001F54" />
      </View>

      {/* FOTO E NOME */}
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/women/65.jpg' }}
        style={styles.avatar}
      />
      <Text style={styles.bemVinda}>BEM-VINDA</Text>
      <Text style={styles.nome}>JORGELINA DOS SANTOS</Text>

      {/* BOTÕES */}
      <View style={styles.botoesContainer}>
        {botoes.map((botao, index) => (
          <TouchableOpacity key={index} style={styles.botao} onPress={() => router.push(botao.rota as any)}>
            <MaterialIcons name={botao.icon as any} size={24} color="#fff" />
            <Text style={styles.botaoTexto}>{botao.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  topIcons: {
    position: 'absolute',
    top: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  bemVinda: {
    color: '#001F54',
    fontWeight: '600',
    fontSize: 16,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001F54',
    marginBottom: 30,
  },
  botoesContainer: {
    width: '100%',
    gap: 25,
  },
  botao: {
    backgroundColor: '#01497C',
    padding: 25,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
