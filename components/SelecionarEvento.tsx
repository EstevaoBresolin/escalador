import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Evento {
  id: string;
  titulo: string;
  data: string;
  hora: string;
}

interface EventoPorDataProps {
  eventos: Evento[];
  dataSelecionada: string;
  onChange: (eventoSelecionado: Evento) => void;
}

const SelecionarEvento: React.FC<EventoPorDataProps> = ({
  eventos,
  dataSelecionada,
  onChange
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(
    null
  );
  const eventosFiltrados = eventos.filter(
    (evento) => evento.data === dataSelecionada
  );

  const selecionar = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalVisible(false);
    onChange(evento);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>
          {eventoSelecionado?.titulo || 'Selecionar Evento'}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#fff" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>
              Eventos em <Text style={styles.data}>{dataSelecionada}</Text>
            </Text>

            {eventosFiltrados.length > 0 ? (
              <FlatList
                data={eventosFiltrados}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.eventItem}
                    onPress={() => selecionar(item)}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color="#5179EF"
                      style={{ marginRight: 8 }}
                    />
                    <View style={styles.textos}>
                        <Text style={styles.eventText}> {item.titulo}</Text>
                        <Text style={styles.eventText}> {item.hora}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <Text style={styles.noEvents}>
                Nenhum evento para esta data.
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    color: '#333'
  },
  data: {
    color: '#5179EF'
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8
  },
  eventText: {
    fontSize: 16,
    color: '#333'
  },
  noEvents: {
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginTop: 20
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: 'center'
  },
  closeText: {
    color: '#5179EF',
    fontWeight: 'bold',
  },
  textos: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default SelecionarEvento;
