import { Drawer,   } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Cabeçalho personalizado */}
      <View style={styles.header}>
        <Text style={styles.title}>Escalador</Text>
        <Text style={styles.subtitle}>Bem-vindo!</Text>
      </View>

      <DrawerItem label="Início" onPress={() => props.navigation.navigate('index')} />

      {/* <DrawerItem label="Sobre" onPress={() => props.navigation.navigate('about')} /> */}

      <DrawerItem label="Cadastrar Escala" onPress={() => props.navigation.navigate('cadastro-escalas')} />

      <DrawerItem label="Consultar Escalas" onPress={() => props.navigation.navigate('consulta-escalas')} />

    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#3B82F6' },
        headerTintColor: '#fff',
        drawerActiveBackgroundColor: '#60A5FA',
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { fontWeight: 'bold' },
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#60A5FA',
    marginBottom: 20,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
})