// Somar.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Props = {
  numero1: number;
  numero2: number;
};

export default function Somar({ numero1, numero2 }: Props) {
    
    const[resultado, setResultado] = useState<number | null>(null);

    const calcular = () => {
        setResultado(numero1 + numero2)
    }


  return (
    <View style={styles.resultadoBox}>
      <Button title="Calcular" onPress={calcular} />
      <Text style={styles.resultadoText}>
        Resultado: {numero1} + {numero2} = {resultado}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultadoBox: {
    marginTop: 20,
    padding: 12,
    // backgroundColor: '#dff9fb',
    borderRadius: 8,
  },
  resultadoText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#130f40',
    fontWeight: 'bold',
  },
});
