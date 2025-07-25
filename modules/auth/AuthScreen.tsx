import React from 'react';
import { View, Text } from 'react-native';
import authStyles from '../styles/auth.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type AuthScreenProps = NativeStackScreenProps<RootStackParamList, 'Auth'>;

export function AuthScreen(props: AuthScreenProps) {
  // Puedes usar navigation o route si lo necesitas:
  // const { navigation, route } = props;

  return (
    <View style={authStyles.center}>
      <Text>Pantalla de Autenticación</Text>
    </View>
  );
}
