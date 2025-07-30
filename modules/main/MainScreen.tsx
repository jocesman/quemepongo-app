//mainScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import mainStyles from '../../styles/main.styles';
import { AsyncStorageService } from '../../src/services/AsyncStorageService';
import { API_URL } from '@env';
import { Picker } from '@react-native-picker/picker';

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export function MainScreen({ navigation }: MainScreenProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [climaSeleccionado, setClimaSeleccionado] = useState<'frio' | 'calor' | 'templado' | 'lluvia'>('frio');
  const [outfitGenerado, setOutfitGenerado] = useState<any | null>(null);
  const [historial, setHistorial] = useState<any[]>([]);

  const getUserData = async () => {
    try {
      const token = await AsyncStorageService.getToken();
      const user = await AsyncStorageService.getUser();

      if (!token || !user) {
        navigation.replace('Auth');
        return;
      }

      setUser(user);
    } catch (error) {
      Alert.alert('Error leyendo datos o sesión expirada', 'Por favor, inicia sesión nuevamente.');
      navigation.replace('Auth');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistorial = async () => {
    try {
      const token = await AsyncStorageService.getToken();
      const response = await fetch(`${API_URL}/outfit/historial`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn('No se pudo cargar historial:', data.message);
        return;
      }

      setHistorial(data);
    } catch (error) {
      console.error('Error al cargar historial:', error);
    }
  };

  useEffect(() => {
    getUserData();
    fetchHistorial();
  }, []);

  const generarOutfit = async () => {
    try {
      const token = await AsyncStorageService.getToken();

      const response = await fetch(`${API_URL}/prendas/outfit?clima=${climaSeleccionado}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (!response.ok) {
        console.warn('Error al generar outfit:', data.message);
        return;
      }

      setOutfitGenerado(data);

      const saveRes = await fetch(`${API_URL}/outfit`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          superiorId: data.superior?.id,
          inferiorId: data.inferior?.id,
          accesorioId: data.accesorio?.id || null,
          clima: climaSeleccionado,
        }),
      });

      if (!saveRes.ok) {
        const saveError = await saveRes.json();
        console.error('Error guardando outfit:', saveError);
      } else {
        fetchHistorial(); // recargar historial
      }
    } catch (error) {
      Alert.alert('Error al generar o guardar outfit', 'Por favor, inténtalo de nuevo.');
      console.error('Error al generar o guardar outfit:', error);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Sesión cerrada', 'Has salido correctamente.');
    navigation.replace('Auth');
  };

  if (loading) {
    return (
      <View style={mainStyles.center}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  const renderOutfitItem = ({ item }: { item: any }) => (
    <View style={mainStyles.card}>
      {item.superior?.imagenes?.[0]?.url && (
        <Image
          source={{ uri: item.superior.imagenes[0].url }}
          style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />
      )}
      <Text>🧥 Superior: {item.superior?.nombre || 'N/A'}</Text>
      <Text>👖 Inferior: {item.inferior?.nombre || 'N/A'}</Text>
      {item.inferior?.imagenes?.[0]?.url && (
        <Image
          source={{ uri: item.inferior.imagenes[0].url }}
          style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }}
          resizeMode="cover"
        />
      )}
      {item.accesorio && <Text>🧣 Accesorio: {item.accesorio?.nombre}</Text>}
      <Text>🌡 Clima: {item.clima}</Text>
      <Text>📅 Fecha: {new Date(item.fecha).toLocaleString()}</Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={mainStyles.container}>
        <Text style={mainStyles.title}>¡Hola {user?.name}!</Text>
        <Text style={mainStyles.subtitle}>Tu email: {user?.email}</Text>

        <Text style={mainStyles.subtitle}>Clima actual:</Text>
        <Picker
          selectedValue={climaSeleccionado}
          onValueChange={(itemValue) => setClimaSeleccionado(itemValue)}
          style={{ marginBottom: 12, color: '#010101' }}
        >
          <Picker.Item label="Frío ❄️" value="frio" />
          <Picker.Item label="Calor ☀️" value="calor" />
          <Picker.Item label="Templado 🌤" value="templado" />
          <Picker.Item label="Lluvia 🌧" value="lluvia" />
        </Picker>

        <TouchableOpacity onPress={generarOutfit} style={mainStyles.button}>
          <Text style={mainStyles.buttonText}>🎲 Generar Outfit</Text>
        </TouchableOpacity>

        {outfitGenerado && (
          <View style={mainStyles.card}>
            <Text style={{ fontWeight: 'bold' }}>Outfit generado:</Text>
            <Text>🧥 Superior: {outfitGenerado.superior?.nombre || 'N/A'}</Text>
            <Text>👖 Inferior: {outfitGenerado.inferior?.nombre || 'N/A'}</Text>
            {outfitGenerado.accesorio && <Text>🧣 Accesorio: {outfitGenerado.accesorio?.nombre}</Text>}
          </View>
        )}

        <TouchableOpacity
          style={mainStyles.button}
          onPress={() => navigation.navigate('AddPrenda')}
        >
          <Text style={mainStyles.buttonText}>➕ Agregar nueva prenda</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={mainStyles.button}
          onPress={() => navigation.navigate('ManagePrendas')}
        >
          <Text style={mainStyles.buttonText}>👕 Gestionar Prendas</Text>
        </TouchableOpacity>

        <Text style={mainStyles.subtitle}>Historial de Outfits</Text>

        {historial.length === 0 ? (
          <Text style={{ textAlign: 'center' }}>No hay outfits registrados aún.</Text>
        ) : (
          <FlatList
            data={historial}
            renderItem={renderOutfitItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false} // el ScrollView lo maneja
          />
        )}

        <View style={{ marginVertical: 20 }}>
          <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
      </View>
    </ScrollView>
  );
}

