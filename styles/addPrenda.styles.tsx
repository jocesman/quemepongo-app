//addPrenda.styles.tsx
import { StyleSheet } from 'react-native';

const addPrendaStyles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333'
  },
  textLabel: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    color: '#333'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#000'
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12
  }
});

export default addPrendaStyles;
