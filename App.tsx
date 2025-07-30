// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from './modules/initial/initialScreen';
import { AuthScreen } from './modules/auth/AuthScreen';
import { RootStackParamList } from './modules/navigation/types';
import { RegisterScreen } from './modules/users/Users.Register';
import { MainScreen } from './modules/main/MainScreen';
import { AddPrendaScreen } from './modules/prendas/AddPrendaScreen';
import { ManagePrendasScreen } from './modules/prendas/ManagePrendasScreen';
import { EditPrendaScreen } from './modules/prendas/EditPrendaScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AddPrenda" component={AddPrendaScreen} />
        <Stack.Screen name="ManagePrendas" component={ManagePrendasScreen} />
        <Stack.Screen name="EditPrenda" component={EditPrendaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
