// app/cadastro-escalas.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function GestaoDepartamentos() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Página de Gestão de Departamentos</Text>
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
