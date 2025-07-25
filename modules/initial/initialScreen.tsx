import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import initialStyles from '../../styles/initial.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen(props: SplashScreenProps) {
  const { navigation } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer); // limpiamos el timeout al desmontar
  }, [navigation]);

  return (
    <View style={initialStyles.container}>
      <Image
        style={initialStyles.logo}
        source={require('../../assets/images/quemepongo-fondo-blanco.jpg')}
       />
      <Text>Iniciando tu experiencia con el estilo </Text>
      <Text>¿Qué me pongo?</Text>
      <Text></Text>
      <Text>Por favor, espere ...</Text>
    </View>
  );
}
