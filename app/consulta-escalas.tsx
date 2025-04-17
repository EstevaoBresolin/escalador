import React, { useState, useEffect, useLayoutEffect  } from 'react';
import { useRouter, Link, useLocalSearchParams, useNavigation  } from 'expo-router';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Provider } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface Evento {
  id: string;
  titulo: string;
  data: string; // formato: dd/mm/yyyy
  hora: string;
  departamentos: Departamento[];
}

interface Departamento {
  id: string;
  nome: string;
}

const departamentosMock: Departamento[] = [
  { id: '1', nome: 'Louvor' },
  { id: '2', nome: 'Intercessão' },
  { id: '3', nome: 'Fotografia' },
]

const eventosMock: Evento[] = [
  { id: '1', titulo: 'Culto da Família', data: '14/04/2025', hora: '14:00',
    departamentos: [
      { id: '1', nome: 'Louvor' },
      { id: '2', nome: 'Intercessão' }
    ]
   },
  { id: '2', titulo: 'Reunião Jovens', data: '14/04/2025', hora: '20:00', departamentos: []},
  { id: '3', titulo: 'Ensaio Coral', data: '15/04/2025', hora: '18:00', departamentos: []},
];

export default function ConsultaEscalas() {
  const [eventosSelecionado, setEventosSelecionado] = useState(true);
  const [volunatariosSelecionado, setVolunatariosSelecionado] = useState(false);

  const [buscaNome, setBuscaNome] = useState('');
  const [buscaNomeDepartamento, setBuscaNomeDepartamento] = useState('');
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>(eventosMock);
  const [departamentosFiltrados, setDepartamentosFiltrados] = useState<Departamento[]>(departamentosMock);
  const router = useRouter();

  const Opcao = (eve: boolean, vol: boolean) => {
    setEventosSelecionado(eve);
    setVolunatariosSelecionado(vol);
  };

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Consultar Escalas', // título do header
    });
  }, [navigation]);

  useEffect(() => {
    const filtrados = eventosMock.filter(evento => {
      const correspondeNome = evento.titulo.toLowerCase().includes(buscaNome.toLowerCase());
      const correspondeData = dataSelecionada ? evento.data === dataSelecionada : true;
      return correspondeNome && correspondeData;
    });
    setEventosFiltrados(filtrados);
  }, [buscaNome, dataSelecionada]);

  useEffect(() => {
    const filtradosDep = departamentosMock.filter(departamento => {
      const correspondeNome = departamento.nome.toLowerCase().includes(buscaNomeDepartamento.toLowerCase());
      return correspondeNome;
    });
    setDepartamentosFiltrados(filtradosDep);
  }, [buscaNomeDepartamento, dataSelecionada]);

  const handleConfirm = (date: Date) => {
    const dataFormatada = date.toLocaleDateString('pt-BR'); 
    setDataSelecionada(dataFormatada);
    setDatePickerVisibility(false);
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.botoes}>
          <Button onPress={() => Opcao(true, false)} style={[ styles.botao, eventosSelecionado ? styles.botaoAtivo : styles.botaoInativo ]} labelStyle={ eventosSelecionado ? styles.labelAtivo : styles.labelInativo } >
            Eventos
          </Button>
          <Button onPress={() => Opcao(false, true)} style={[ styles.botao, volunatariosSelecionado ? styles.botaoAtivo : styles.botaoInativo ]} labelStyle={ volunatariosSelecionado ? styles.labelAtivo : styles.labelInativo } >
            Voluntários
          </Button>
        </View>

        {eventosSelecionado && (
          <View style={styles.main}>
            <TextInput
              mode="outlined"
              label="Buscar por nome"
              value={buscaNome}
              onChangeText={setBuscaNome}
              style={{ marginBottom: 10, backgroundColor: '#fff',  }}
            />

            {/* <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={{ marginBottom: 10 }}>
              {dataSelecionada ? `Data: ${dataSelecionada}` : 'Selecionar data'}
            </Button> */}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />

            <FlatList
              data={eventosFiltrados}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.lista}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/eventos/${item.id}`)}>
                  <Text style={styles.cardItem}>
                    {item.titulo} {item.data} {item.hora}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {volunatariosSelecionado && (
          <View style={styles.main}>
            <TextInput
              mode="outlined"
              label="Buscar por nome"
              value={buscaNomeDepartamento}
              onChangeText={setBuscaNomeDepartamento}
              style={{ marginBottom: 10, backgroundColor: '#fff',  }}
            />

            {/* <Button onPress={() => setDatePickerVisibility(true)} mode="outlined" style={{ marginBottom: 10 }}>
              {dataSelecionada ? `Data: ${dataSelecionada}` : 'Selecionar data'}
            </Button> */}

            <FlatList
              data={departamentosFiltrados}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.lista}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card} onPress={() => router.push(`/departamentos/${item.id}`)}>
                  <Text style={styles.cardItem}>
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}


      </View>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  botoes: {
    borderRadius: 8,
    padding: 10,
    width: '90%',
    marginTop: 20,
    backgroundColor: '#00A6A6DD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  botao: {
    width: '48%',
    padding: 4,
    backgroundColor: 'red',
  },
  botaoAtivo: {
    backgroundColor: '#1B3B6F',
  },
  botaoInativo: {
    backgroundColor: 'transparent',
  },
  labelAtivo: {
    color: '#fff',
  },
  labelInativo: {
    color: '#1B3B6F',
  },
  card: {
    padding: 25,
    backgroundColor: '#9ED9F8',
    borderRadius: 8,
  },
  cardItem: {
    color: '#01497C',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center'
  },
  lista: {
    marginTop: 20,
    gap: 15,
  },
  main: {
    marginTop: 15,
    marginBottom: 15,
    width: '90%'
  }
});
