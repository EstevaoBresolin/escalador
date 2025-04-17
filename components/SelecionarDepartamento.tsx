import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Departamento {
  id: string;
  nome: string;
}

interface Props {
  departamentos: Departamento[];
  onChange: (departamento: Departamento) => void;
}

const SelecionarDepartamento: React.FC<Props> = ({
  departamentos,
  onChange
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [departamentoSelecionado, setDepartamentoSelecionado] =
    useState<Departamento | null>(null);

  const selecionar = (departamento: Departamento) => {
    setDepartamentoSelecionado(departamento);
    onChange(departamento);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {departamentoSelecionado?.nome || 'Selecionar Departamento'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>Selecione um departamento</Text>
            <FlatList
              data={departamentos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = departamentoSelecionado?.id === item.id;
                return (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => selecionar(item)}
                  >
                    <Text style={styles.itemText}>{item.nome}</Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#5179EF"
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 150,
    backgroundColor: '#5179EF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 14,
    color: '#333'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8
  },
  itemText: {
    fontSize: 16,
    color: '#333'
  }
});

export default SelecionarDepartamento;
