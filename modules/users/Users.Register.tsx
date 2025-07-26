import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import registerStyles from '../../styles/register.style'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type RegistScreenProps = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export function RegisterScreen({ navigation }: RegistScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; password?: string }>({});

  // Validación básica de email
  const validateEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  // Controlar cambios y validar inputs
  const handleNameChange = (text: string) => setName(text);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setErrors((prev) => ({ ...prev, email: validateEmail(text) ? '' : 'Correo electrónico no válido' }));
  };

  const [password, setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');

const handlePasswordChange = (text: string) => {
  setPassword(text);
  if (text.length > 0 && text.length < 8) {
    setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 8 caracteres' }));
  } else if (text.length > 15) {
    setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener máximo 15 caracteres' }));
  } else {
    setErrors((prev) => ({ ...prev, password: '' }));
  }
};

  const handlePhoneChange = (text: string) => {
    // Solo números
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
    // Validar longitud entre 10 y 15
    if (numericText.length < 10) {
      setErrors((prev) => ({ ...prev, phone: 'El teléfono debe tener al menos 10 dígitos' }));
    } else if (numericText.length > 15) {
      setErrors((prev) => ({ ...prev, phone: 'El teléfono debe tener máximo 15 dígitos' }));
    } else {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  // Validar que todos los campos estén correctos antes de habilitar submit
  const isFormValid =
  name.trim().length > 0 &&
  validateEmail(email) &&
  phone.length >= 10 &&
  phone.length <= 15 &&
  password.length >= 8 &&
  password.length <= 15 &&
  !errors.email &&
  !errors.phone &&
  !errors.password;

  const handleRegister = async () => {
  if (!isFormValid) return;

  try {
    // const response = await fetch(`${process.env.API_URL}/user`, {
    const response = await fetch('http://192.168.0.7:3000/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en registro:', errorData);
      Alert.alert('Error al registrar', 'El servidor no responde, inténtalo de nuevo.');
    }

    const data = await response.json();
    console.log('Datos de registro:', data);

    // Navegar a Auth (o pantalla principal)
    navigation.navigate('Auth');
  } catch (error) {
    console.error('Error al registrar:', error);
    Alert.alert('Error al registrar', 'El servidor no responde, inténtalo de nuevo.');
  }
};



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={registerStyles.center}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <Image source={require('../../assets/images/quemepongo-fondo-blanco.jpg')} style={registerStyles.imagen} />
      <Text style={registerStyles.title}>Regístrate</Text>

      <Text style={registerStyles.textLabel}>Nombre</Text>
      <TextInput
        style={registerStyles.textInput}
        placeholder="Ingresa tu nombre"
        placeholderTextColor="#666"
        value={name}
        onChangeText={handleNameChange}
        autoCapitalize="words"
      />
      {!!errors.name && <Text style={registerStyles.errorText}>{errors.name}</Text>}

      <Text style={registerStyles.textLabel}>Correo Electrónico</Text>
      <TextInput
        style={registerStyles.textInput}
        placeholder="ejemplo@correo.com"
        placeholderTextColor="#666"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="emailAddress"
      />
      {!!errors.email && <Text style={registerStyles.errorText}>{errors.email}</Text>}

      <Text style={registerStyles.textLabel}>Teléfono</Text>
      <TextInput
        style={registerStyles.textInput}
        placeholder="Solo números, mínimo 10 y máximo 15"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={phone}
        onChangeText={handlePhoneChange}
        maxLength={15}
      />
      {!!errors.phone && <Text style={registerStyles.errorText}>{errors.phone}</Text>}

      <Text style={registerStyles.textLabel}>Contraseña</Text>
        <TextInput
        style={registerStyles.textInput}
        placeholder="Ingresa tu contraseña"
        placeholderTextColor="#666"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        maxLength={15}
        autoCapitalize="none"
        autoCorrect={false}
        />
        {!!errors.password && <Text style={registerStyles.errorText}>{errors.password}</Text>}


      <TouchableOpacity
        style={[registerStyles.button, !isFormValid && registerStyles.buttonDisabled]}
        disabled={!isFormValid}
        onPress={handleRegister}
      >
        <Text style={[registerStyles.buttonText, !isFormValid && registerStyles.buttonTextDisabled]}>
          Registrarse
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
