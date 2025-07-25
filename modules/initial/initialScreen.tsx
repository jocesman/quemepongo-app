import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import initialStyles from '../styles/initial.styles';
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
      <Text style={initialStyles.title}>¿Qué me pongo?</Text>
    </View>
  );
}
