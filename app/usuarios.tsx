import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import FormularioPessoa from '../components/FormularioPessoa';

type Usuario = {
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
};

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const adicionarUsuario = (novoUsuario: Usuario) => {
    setUsuarios([...usuarios, { ...novoUsuario, id: crypto.randomUUID() }]);
    setMostrarFormulario(false);
  };

  const editarUsuario = (usuarioEditado: Usuario) => {
    setUsuarios(usuarios.map(u => u.id === usuarioEditado.id ? usuarioEditado : u));
    setUsuarioEditando(null);
    setMostrarFormulario(false);
  };

  const excluirUsuario = (usuario: Usuario) => {
    setUsuarios(usuarios.filter(u => u.id !== usuario.id));
  };

  const aoSalvar = (usuario: Usuario) => {
    if (usuarioEditando) {
      editarUsuario(usuario);
    } else {
      adicionarUsuario(usuario);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuários</Text>

      <Button
        title={mostrarFormulario ? "Cancelar" : "Adicionar Usuário"}
        onPress={() => {
          setUsuarioEditando(null);
          setMostrarFormulario(!mostrarFormulario);
        }}
      />

      {mostrarFormulario && (
        <FormularioPessoa onSalvar={aoSalvar} pessoa={usuarioEditando ?? undefined} />
      )}

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text>{item.phone}</Text>
            <Text>{item.website}</Text>
            <View style={styles.botoes}>
              <Button title="Editar" onPress={() => {
                setUsuarioEditando(item);
                setMostrarFormulario(true);
              }} />
              <Button title="Excluir" onPress={() => excluirUsuario(item)} color="red" />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  lista: { paddingBottom: 40 },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  nome: { fontSize: 16, fontWeight: 'bold' },
  email: { marginBottom: 4 },
  botoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
});
