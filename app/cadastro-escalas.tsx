import React, { useState, useEffect, useLayoutEffect  } from 'react';
import { View, StyleSheet, Platform, Alert  } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Text, TextInput, IconButton, Button, Menu, Provider } from 'react-native-paper';
import SeletorDeData from '../components/SelecionarData';
import EventoPorData from '../components/SelecionarEvento';
import Departamentos from '../components/SelecionarDepartamento';
import Usuarios from '../components/Usuarios';

const departamentosMock = [
  { id: '1', nome: 'Louvor' },
  { id: '2', nome: 'Infantil' },
  { id: '3', nome: 'Jovens' },
];

const eventosMock = [
  { id: '1', titulo: 'Culto da Família', data: '14/04/2025', hora: '14:00' },
  { id: '2', titulo: 'Reunião Jovens', data: '14/04/2025', hora: '20:00'},
  { id: '3', titulo: 'Ensaio Coral', data: '15/04/2025', hora: '18:00'},
];

const usuariosMock = [
  { id: '1', nome: 'Jorge Jesus', idDoDepartamento: "2" },
  { id: '2', nome: 'Pedro Henrique', idDoDepartamento: "2" },
  { id: '3', nome: 'Wesley Da Silva', idDoDepartamento: "1" },
]

interface Evento {
  id: string;
  titulo: string;
  data: string;
  hora: string;
}

interface Departamento {
  id: string;
  nome: string;
}

interface Usuario {
  id: string;
  nome: string;
  idDoDepartamento: string;
}

export default function CadastroEscalas() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState<Departamento | null>(null);
  const [usuariosSelecionados, setUsuariosSelecionados] = useState<Usuario[]>([]);

  const Salvar = () => {
    console.log("Evento Salvo")
    console.log("Nome do Evento:", eventoSelecionado?.titulo)
    console.log("Data:", eventoSelecionado?.data, " - ", eventoSelecionado?.hora )
    console.log("Departamento:", departamentoSelecionado?.nome)
    console.log("Pessoas: ", usuariosSelecionados)
  }

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastrar Escala', // título do header
    });
  }, [navigation]);

  // const handleSubmit = () => {
  //   if (selectedDate) {
  //     Alert.alert('Data válida selecionada:', selectedDate);
  //   } else {
  //     Alert.alert('Erro', 'Por favor, insira uma data válida.');
  //   }
  // };

  // const Botao = () => {
  //   console.log(eventoSelecionado,"eventoSelecionado")
  //   console.log(departamentoSelecionado,"departamentoSelecionado")
  // }

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.card}>
        <Text style={styles.title}>Informe a data:</Text>
        <SeletorDeData onDateChange={setSelectedDate} />
        {selectedDate != null && (
          <View style={styles.btnEventoDepartamento}>
            <EventoPorData eventos={eventosMock} dataSelecionada={selectedDate} onChange={(evento) => setEventoSelecionado(evento)}/>
              {eventoSelecionado && (
                <Departamentos departamentos={departamentosMock} onChange={(dep) => setDepartamentoSelecionado(dep)} />
              )}
              
          </View>
        )}
          {departamentoSelecionado && (
            <Usuarios usuarios={usuariosMock} departamentoIdSelecionado={departamentoSelecionado.id} onChange={(lista : any) => setUsuariosSelecionados(lista)} />
            // <Usuarios usuarios={usuariosMock} departamentoIdSelecionado={departamentoSelecionado.id} onChange={(lista) => setUsuariosSelecionados(lista)} />
          )}
          {eventoSelecionado && departamentoSelecionado &&(
            <Button labelStyle={{ color: '#fff' }} style={styles.btnSalvar} onPress={() => Salvar()}>Salvar</Button>
          )}

        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    // borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#5179EF',
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
  },
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectBox: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    borderColor: '#5C6BC0',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
  },
  title: {
    color: "black",
    fontSize: 16,
  },
  dateText: {
    fontSize: 18,
    color: 'green',
  },
  btnEventoDepartamento: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'space-evenly',
  },
  btnSalvar: {
    marginTop: 15,
    borderRadius: 8,
    backgroundColor: '#9ED9F8',
    color: '#fff',
  }
});
