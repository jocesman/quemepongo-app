import { StyleSheet, Dimensions } from 'react-native';

const registerStyles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -40,
    color: '#222',
    textAlign: 'center',
  },

  textLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
    alignSelf: 'flex-start',
    width: Dimensions.get('window').width * 0.8,
  },

  textInput: {
    width: Dimensions.get('window').width * 0.8,
    height: 50,
    borderRadius: 8,
    backgroundColor: 'rgba(243, 245, 248, 1)',
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 12,
    textAlignVertical: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    fontSize: 16,
    color: '#333',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: Dimensions.get('window').width * 0.8,
  },

  button: {
    width: 200,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonDisabled: {
    backgroundColor: '#A0A0A0',
    shadowOpacity: 0,
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  buttonTextDisabled: {
    color: '#DDD',
  },
  imagen: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('window').height * 0.3,
    borderRadius: 80,
    resizeMode: 'contain',
  },
});

export default registerStyles;
