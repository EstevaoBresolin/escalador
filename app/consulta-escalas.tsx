import { View, Text, StyleSheet } from 'react-native';

export default function ConsultaEscalas() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Página de Consulta de Escalas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
