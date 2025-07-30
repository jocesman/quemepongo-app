// AuthScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import authStyles from '../../styles/auth.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { Alert } from 'react-native';
import { AsyncStorageService } from '../../src/services/AsyncStorageService';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export function AuthScreen({ navigation }: AuthScreenProps) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validar teléfono solo números, 10-15 dígitos
  const handlePhoneChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 15) {
      setPhone(numericText);
      if (numericText.length < 10) {
        setPhoneError('El número debe tener al menos 10 dígitos');
      } else {
        setPhoneError('');
      }
    }
  };

  // Validar contraseña cualquier carácter, longitud 8-10
  const handlePasswordChange = (text: string) => {
    if (text.length <= 15) {
      setPassword(text);
      if (text.length > 0 && text.length < 8) {
        setPasswordError('La contraseña debe tener al menos 8 caracteres');
      } else {
        setPasswordError('');
      }
    }
  };

  // Controla si el botón está habilitado según validaciones sin errores y campos llenos
  useEffect(() => {
    if (
      phone.length >= 10 &&
      phone.length <= 15 &&
      password.length >= 8 &&
      password.length <= 15 &&
      phoneError === '' &&
      passwordError === ''
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [phone, password, phoneError, passwordError]);

  // Lógica para el botón Acceder
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error de autenticación', data.message || 'Credenciales inválidas');
        return;
      }

      // Guardar token y datos del usuario
      await AsyncStorageService.saveSession(data.access_token, data.user);

      const savedUser = await AsyncStorageService.getUser();
       console.log('Usuario guardado en AsyncStorage:', savedUser);


      // Redirigir a pantalla protegida
      navigation.navigate('Main'); 

    } catch (error) {
      console.error('Error en login:', error);
      Alert.alert('Error', 'No se pudo conectar al servidor.');
    }
  };


  // Navegar a registro
  const goToRegister = () => {
    navigation.navigate('RegisterScreen'); 
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={authStyles.center}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <Image
        source={require('../../assets/images/quemepongo-fondo-blanco.jpg')}
        style={authStyles.logo}
      />
      <Text style={authStyles.title}>Accede a tus Outfits</Text>

      <Text style={authStyles.textLabel}>Número de teléfono</Text>
      <TextInput
        style={authStyles.textInput}
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="numeric"
        maxLength={15}
        placeholder="Aquí tu número de teléfono"
        placeholderTextColor="#666"
      />
      {!!phoneError && <Text style={authStyles.errorText}>{phoneError}</Text>}

      <Text style={authStyles.textLabel}>Contraseña</Text>
      <TextInput
        style={authStyles.textInput}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry
        maxLength={15}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {!!passwordError && <Text style={authStyles.errorText}>{passwordError}</Text>}

      <TouchableOpacity
        style={[
          authStyles.button,
          isButtonDisabled && authStyles.buttonDisabled,
        ]}
        disabled={isButtonDisabled}
        onPress={handleLogin}
      >
        <Text
          style={[
            authStyles.buttonText,
            isButtonDisabled && authStyles.buttonTextDisabled,
          ]}
        >
          Acceder
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToRegister}>
        <Text style={authStyles.registerText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
