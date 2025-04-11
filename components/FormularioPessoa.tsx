import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  onSalvar: (pessoa: {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
  }) => void;
  pessoa?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    website: string;
  };
};

export default function FormularioPessoa({ onSalvar, pessoa }: Props) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (pessoa) {
      setId(pessoa.id);
      setName(pessoa.name);
      setEmail(pessoa.email);
      setPhone(pessoa.phone);
      setWebsite(pessoa.website);
    } else {
      setId('');
      setName('');
      setEmail('');
      setPhone('');
      setWebsite('');
    }
  }, [pessoa]);

  const salvar = () => {
    if (name && email && phone && website) {
      onSalvar({
        id: id || crypto.randomUUID(), // Gera um id se for novo
        name,
        email,
        phone,
        website,
      });

      // Limpar os campos após salvar
      setId('');
      setName('');
      setEmail('');
      setPhone('');
      setWebsite('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Website"
        value={website}
        onChangeText={setWebsite}
      />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});
