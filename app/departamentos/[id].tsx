import { useLocalSearchParams, useNavigation  } from 'expo-router';
import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Evento {
    id: string;
    titulo: string;
    data: string;
    hora: string;
    departamentos: Departamento[];
}

interface Departamento {
    id: string;
    nome: string;
    usuarios: Usuario[];
}

interface Usuario {
    id: string;
    nome: string;
    idDoDepartamento: string;
    cargo: Cargo;
  }

interface Cargo {
    id: string;
    nome: string;
    idDoDepartamento: string;
}

const cargosMock = [
    { id: '1', nome: 'Cortes', idDoDepartamento: '1'},
    { id: '2', nome: 'Câmera Móvel', idDoDepartamento: '1'},
    { id: '3', nome: 'Câmera Mezanino', idDoDepartamento: '1'},
];

const usuariosMock = [
    { id: '1', nome: 'Jorge Jesus', idDoDepartamento: "2" },
    { id: '2', nome: 'Pedro Henrique', idDoDepartamento: "2" },
    { id: '3', nome: 'Wesley Da Silva', idDoDepartamento: "1" },
]

const departamentosMock: Departamento[] = [
    { id: '1', nome: 'Louvor',
        usuarios: [
            { id: '1', nome: 'Estevão Bresolin', idDoDepartamento: '1', 
                cargo: {id: '1', nome: 'Bateria', idDoDepartamento: '1'}
            },
            { id: '2', nome: 'Gabriel Patricio', idDoDepartamento: '1', 
                cargo: {id: '2', nome: 'Guitarra', idDoDepartamento: '1'}
            },
            { id: '3', nome: 'João Pedro', idDoDepartamento: '1', 
                cargo: {id: '3', nome: 'Vocalista', idDoDepartamento: '1'}
            },
        ]
    },
    { id: '2', nome: 'Intercessão', 
        usuarios: [
            { id: '1', nome: 'Estevão Bresolin', idDoDepartamento: '2',
                   cargo: {id: '1', nome: 'Cortes', idDoDepartamento: '2'}
            },
            { id: '2', nome: 'Gabriel Patricio', idDoDepartamento: '2', 
                cargo: {id: '2', nome: 'Câmera Mezanino', idDoDepartamento: '2'}
            },
        ] 
    },
]


export default function EventoDetalhe() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Detalhes do Evento`, // 👈 Aqui você define o nome da página
    });
  }, [navigation]);

  const departamento = departamentosMock.find(e => e.id === id);

  if (!departamento) return <Text>Departamento não encontrado</Text>;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.data}> {departamento.data.split('/').slice(0, 2).join('/')} - {evento.hora}</Text> */}
      <Text style={styles.titulo}>{departamento.nome}</Text>
       
            <View>
                {departamento.usuarios.length != 0 &&(
                    <>
                    {/* <View style={styles.departamento}>
                        <Text style={styles.departamentoTexto}>~{item.nome}</Text>
                    </View> */}
                        <FlatList
                        data={departamento.usuarios}
                        keyExtractor={(user) => user.id}
                        contentContainerStyle={styles.users}
                        renderItem={({item}) => {
                            // const cargo = cargosMock.find(c => c.id === item.idDoCargo);
                            return (
                                <View style={styles.usuario}>
                                <Text style={styles.usuarioNome}>{item.nome}</Text>
                                <Text style={styles.cargo}>{item?.cargo.nome ?? 'Cargo não encontrado'}</Text>
                                </View>
                            )
                        }
                        }></FlatList>
                    </>
                )}
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
    color: '#5179EF',
    textAlign: 'center',
  },
  departamentos: {

  },
  users:{
    // marginTop: 20,
    gap: 10,
    // padding: 20,
  },
  usuario: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#9ED9F8',
    padding: 10,
    marginInline: 20,
  },
  usuarioNome: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  data: {
    color: '#01497C',
    textAlign: 'right',
    paddingInline: 20,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
  },
  departamento: {
    textAlign: 'right',
    borderColor: '#01497C',
    borderBottomWidth: 1,
    alignSelf: 'flex-end',
    paddingRight: 80,
  },
  departamentoTexto: {
    textAlign: 'right',
    color: '#01497C',
    fontSize: 24,
  },
  cargo: {
    padding: 5,

    borderRadius: 4,
    backgroundColor: '#5179EF',
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    width: 150,
    margin: 'auto'
  }
});
