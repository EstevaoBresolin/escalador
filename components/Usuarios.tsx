import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Usuario {
  id: string;
  nome: string;
  idDoDepartamento: string;
  fotoUrl?: string;
}

interface Props {
  usuarios: Usuario[];
  departamentoIdSelecionado: string;
  onChange: (selecionados: {
    usuario: Usuario;
    funcao: string;
    quantidade: number;
  }[]) => void;
}

const funcoesMock = ['Cortes', 'Câmera Móvel', 'Câmera Mezanino'];

const UsuariosAvancado: React.FC<Props> = ({
  usuarios,
  departamentoIdSelecionado,
  onChange
}) => {
  const [selecionados, setSelecionados] = useState<
    { usuario: Usuario; funcao: string; quantidade: number }[]
  >([]);

  const usuariosFiltrados = usuarios.filter(
    (u) => u.idDoDepartamento === departamentoIdSelecionado
  );

  useEffect(() => {
    setSelecionados([]);
    onChange([]);
  }, [departamentoIdSelecionado]);

  const alterarUsuario = (
    usuario: Usuario,
    campo: 'funcao' | 'quantidade',
    valor: any
  ) => {
    let atual = [...selecionados];
    const index = atual.findIndex((x) => x.usuario.id === usuario.id);

    if (index !== -1) {
      atual[index] = {
        ...atual[index],
        [campo]: valor
      };
    } else {
      atual.push({
        usuario,
        funcao: campo === 'funcao' ? valor : '',
        quantidade: campo === 'quantidade' ? valor : 0
      });
    }

    setSelecionados(atual);
    onChange(atual);
  };

  const toggleCheckbox = (usuario: Usuario) => {
    const jaSelecionado = selecionados.find((s) => s.usuario.id === usuario.id);
    if (jaSelecionado) {
      const atualizados = selecionados.filter((s) => s.usuario.id !== usuario.id);
      setSelecionados(atualizados);
      onChange(atualizados);
    } else {
      const atualizado = [
        ...selecionados,
        { usuario, funcao: '', quantidade: 0 }
      ];
      setSelecionados(atualizado);
      onChange(atualizado);
    }
  };

  return (
    <View>
      {usuariosFiltrados.length === 0 ? (
        <Text style={styles.vazio}>Nenhum usuário neste departamento.</Text>
      ) : (
        <FlatList
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const selecionado = selecionados.find((s) => s.usuario.id === item.id);
            return (
              <View style={styles.card}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.nome}>{item.nome}</Text>
                  <View style={styles.linha}>
                    <Picker
                      selectedValue={selecionado?.funcao || ''}
                      onValueChange={(value) =>
                        alterarUsuario(item, 'funcao', value)
                      }
                      style={styles.picker}
                    >
                      <Picker.Item label="Selecione a função" value="" />
                      {funcoesMock.map((f) => (
                        <Picker.Item label={f} value={f} key={f} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item)}
                  style={styles.checkboxContainer}
                >
                  <Ionicons
                    name={
                      selecionado ? 'checkbox-outline' : 'square-outline'
                    }
                    size={24}
                    color={selecionado ? '#5179EF' : '#777'}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9ED9F8',
    marginVertical: 8,
    padding: 10,
    borderRadius: 12
  },
  nome: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  picker: {
    color: '#8d8d8d',
    borderRadius: 8,
    borderColor: '#cccccc',
    flex: 1,
    height: 35,
    marginRight: 8
  },
  checkboxContainer: {
    marginLeft: 10,
    padding: 6,
    borderRadius: 8
  },
  vazio: {
    textAlign: 'center',
    padding: 20,
    color: '#777'
  }
});

export default UsuariosAvancado;
