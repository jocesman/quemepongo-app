//main.styles.tsx
import { StyleSheet } from 'react-native';

const mainStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center'
  },
  card: {
  backgroundColor: '#fff',
  padding: 12,
  marginVertical: 8,
  borderRadius: 8,
  elevation: 2,
},
// button: {
//   backgroundColor: '#007bff',
//   padding: 12,
//   marginVertical: 12,
//   borderRadius: 8,
//   alignItems: 'center',
// },
// buttonText: {
//   color: '#fff',
//   fontSize: 16,
// },
textInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: 8,
  marginBottom: 10,
  backgroundColor: '#fff',
},
button: {
  backgroundColor: '#007bff',
  padding: 12,
  marginVertical: 10,
  borderRadius: 8,
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontSize: 16,
},



  });

export default mainStyles;