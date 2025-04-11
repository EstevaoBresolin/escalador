import { Text, View, StyleSheet } from "react-native";

export default function AboutScreen(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>About vddxvxv Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa maxime, quam, dolor ipsam quaerat quas magnam nesciunt nam deleniti eveniet pariatur impedit quos sint earum cupiditate! Doloremque, debitis distinctio. Veritatis.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
    },
  });