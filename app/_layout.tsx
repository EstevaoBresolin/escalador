// import { Tabs } from "expo-router";
// import Ionicons from "@expo/vector-icons/Ionicons";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: "#ffd33d",
//         headerStyle: {
//           backgroundColor: "#25292e",
//         },
//         headerShadowVisible: false,
//         headerTintColor: "#fff",
//         tabBarStyle: {
//           backgroundColor: "#25292e",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, focused }: { color: string; focused: boolean })  => (
//             <Ionicons
//               name={focused ? "home-sharp" : "home-outline"}
//               color={color}
//               size={24}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="indaex"
//         options={{
//           title: "Hoame",
//           tabBarIcon: ({ color, focused }: { color: string; focused: boolean })  => (
//             <Ionicons
//               name={focused ? "home-sharp" : "home-outline"}
//               color={color}
//               size={24}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="about"
//         options={{
//           title: "About",
//           tabBarIcon: ({ color, focused }: { color: string; focused: boolean })  => (
//             <Ionicons
//               name={
//                 focused ? "information-circle" : "information-circle-outline"
//               }
//               color={color}
//               size={24}
//             />
//           ),
//         }}
//       />
      
//     </Tabs>
//   );
// }

import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Cabeçalho personalizado */}
      <View style={styles.header}>
        <Text style={styles.title}>Escalador</Text>
        <Text style={styles.subtitle}>Bem-vindo!</Text>
      </View>

      {/* Itens padrão do menu */}
      <DrawerItemList {...props} />
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
    marginBottom: 20
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