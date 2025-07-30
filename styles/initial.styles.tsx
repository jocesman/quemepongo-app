//initial.styles.tsx
import { Dimensions, StyleSheet } from "react-native";

const initialStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo: {
    width: Dimensions.get('window').width * 0.9, // Ancho del 90% de la pantalla
    height: Dimensions.get('window').width * 0.9, // Altura igual al ancho para mantener la proporción
    marginBottom: 20,
    borderRadius: 80
  },
});

export default initialStyles;