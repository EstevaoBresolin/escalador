import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, IconButton, Menu, Button, Provider } from 'react-native-paper';

const eventos = ['Culto Domingo', 'Culto Jovem', 'Encontro de Casais'];
const departamentos = ['Louvor', 'Multimídia', 'Recepção', 'Diaconato'];

export default function CadastroEscalas() {
  const [eventoSelecionado, setEventoSelecionado] = useState('');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');

  const [menuEventoVisible, setMenuEventoVisible] = useState(false);
  const [menuDeptoVisible, setMenuDeptoVisible] = useState(false);

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.card}>
          {/* <IconButton icon="home" size={24} onPress={() => {}} /> */}

          <View style={styles.inputContainer}>
            <Text style={styles.label}> <Text style={{ color: '#5179EF' }}>Selecione o dia</Text></Text>
            <TextInput
              mode="outlined"
              value={eventoSelecionado}
              style={styles.textInput}
              editable={false}
              placeholder='Selecione a Data'
              selectionColor='#5179EF'
              right={<TextInput.Icon icon="menu-down" onPress={() => setMenuEventoVisible(true)} />}
            />
            <Menu
              visible={menuEventoVisible}
              onDismiss={() => setMenuEventoVisible(false)}
              anchor={{ x: 10, y: 180 }}
            >
              {eventos.map((evento) => (
                <Menu.Item
                  key={evento}
                  onPress={() => {
                    setEventoSelecionado(evento);
                    setMenuEventoVisible(false);
                  }}
                  title={evento}
                />
              ))}
            </Menu>
          </View>

          <View style={styles.selectRow}>
            <View style={styles.selectBox}>
              <Text style={styles.label}>Evento</Text>
              <Button
                mode="outlined"
                onPress={() => setMenuEventoVisible(true)}
                style={styles.button}
                contentStyle={{ justifyContent: 'space-between' }}
                icon="menu-down"
              >
                {eventoSelecionado || 'Selecione'}
              </Button>
            </View>

            <View style={styles.selectBox}>
              <Text style={styles.label}>Departamento</Text>
              <Button
                mode="outlined"
                onPress={() => setMenuDeptoVisible(true)}
                style={styles.button}
                contentStyle={{ justifyContent: 'space-between' }}
                icon="menu-down"
              >
                {departamentoSelecionado || 'Selecione'}
              </Button>
              <Menu
                visible={menuDeptoVisible}
                onDismiss={() => setMenuDeptoVisible(false)}
                anchor={{ x: 220, y: 180 }}
              >
                {departamentos.map((d) => (
                  <Menu.Item
                    key={d}
                    onPress={() => {
                      setDepartamentoSelecionado(d);
                      setMenuDeptoVisible(false);
                    }}
                    title={d}
                  />
                ))}
              </Menu>
            </View>
          </View>
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
    // backgroundColor: '#fff',
    // borderRadius: 16,
    // padding: 20,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    // borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#5179EF,'
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
});
